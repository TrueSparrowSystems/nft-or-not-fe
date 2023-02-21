import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CollectNFT.module.scss";
import collectNFTModalStyles from "./collectModal.module.scss";
import CollectNFTModal from "./collectNFTModal";
import { axiosInstance } from "../../../AxiosInstance";
import { useAuthContext } from "../../../context/AuthContext";
import { ClipLoader } from "react-spinners";
import Card from "../../Card";
import UserApi from "../../../graphql/UserApi";
import { useAccount } from "wagmi";
import CustomSignInModal from "../../CustomSignInModal";
import EnableDispatcherModal from "../../EnableDispatcherModal";

function CollectNFT(props) {
  const [modalShown, toggleModal] = useState(false);
  const { isUserLoggedIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [collectData, setCollectData] = useState([]);
  const { address } = useAccount();
  const [isDispatcherEnabled, setIsDispatcherEnabled] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showDispatcherModal, setShowDispatcherModal] = useState(false);
  const isFirstTimeLoading = useRef(false);
  const allData = useRef([]);
  let hasNextPageIdentifier = useRef(null);

  const fetchCollectData = async () => {
    try {
      setIsLoading(true);
      const collectApiResponse = await axiosInstance.get("collect-nfts", {
        params: {
          pagination_identifier: hasNextPageIdentifier.current,
        },
      });

      if (collectApiResponse.data.success) {
        const collectData = collectApiResponse.data.data;
        const lensPosts = collectData?.lens_posts_ids;
        const lensPostDetails = collectData?.lens_posts;
        const lensPostDetailsImages = collectData?.images;
        const lensPostDetailsTexts = collectData?.texts;
        const currentUserLensPostRelations =
          collectData?.current_user_lens_post_relations;
        const users = collectData?.users;
        const nextPagePayload =
          collectData.meta && collectData.meta.next_page_payload;
        hasNextPageIdentifier.current =
          nextPagePayload && nextPagePayload.pagination_identifier;

        let data = [];
        for (let i = 0; i < lensPosts.length; i++) {
          const lensPostDetail = Object.values(lensPostDetails)?.find(
            (post) => post.id == lensPosts[i]
          );

          const lensPostImageDetail = Object.values(
            lensPostDetailsImages
          )?.find((image) => image.id == lensPostDetail.image_id);
          const lensPostTextDetails = Object.values(lensPostDetailsTexts)?.find(
            (text) => text.id == lensPostDetail.description_text_id
          );

          const currentUserLensPostRelation = Object.values(
            currentUserLensPostRelations
          )?.find(
            (lensPost) =>
              lensPost.id == lensPostDetail.current_user_lens_post_relation_id
          );

          const ownerUser = Object.values(users)?.find(
            (user) => user.id == lensPostDetail.owner_user_id
          );

          let postData = {
            title: lensPostDetail?.title,
            description: lensPostTextDetails?.text,
            image: lensPostImageDetail?.url,
            lensPublicationId: lensPostDetail?.lens_publication_id,
            lensId: lensPostDetail?.id,
            lensProfileOwnerAddress: ownerUser.lens_profile_owner_address,
            hasCollected:
              !!currentUserLensPostRelation?.collect_nft_transaction_hash,
            handle: ownerUser?.lens_profile_username,
            totalVotes: lensPostDetail?.total_votes,
          };

          data.push(postData);
        }
        allData.current = [...data, ...allData.current];
        setCollectData(data);
        setTimeout(() => {
          isFirstTimeLoading.current = true;
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const showModal = async (ele) => {
    //removed to allow multiple collect
    // if (ele.hasCollected) {
    //   return;
    // }
    setModalData({ ...ele });
    setShowSignInModal(!isUserLoggedIn);

    const defaultProfileResponse = await UserApi.defaultProfile({
      walletAddress: address,
    });

    const defaultProfile = defaultProfileResponse?.data?.defaultProfile;

    if (!defaultProfile?.dispatcher?.address) {
      setIsDispatcherEnabled(false);
    } else setIsDispatcherEnabled(true);
    setShowDispatcherModal(!isDispatcherEnabled);

    toggleModal(!modalShown);
  };

  useEffect(() => {
    allData.current = [];
    if (isUserLoggedIn) {
      fetchCollectData();
    }
  }, [isUserLoggedIn]);

  const handleScroll = (event) => {
    const target = event.target;

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      // console.log("reached end", hasNextPageIdentifier.current);
      if (hasNextPageIdentifier.current) {
        fetchCollectData();
      }
    }
  };

  return (
    <div
      className={`${styles.collectNft} mt-[40px]  min-h-0 container pl-0 pr-0`}
    >
      {showSignInModal && !isUserLoggedIn ? (
        <CustomSignInModal
          isOpen={showSignInModal}
          onRequestClose={() => setShowSignInModal(false)}
          onSuccess={() => showModal(modalData)}
        />
      ) : null}

      {showDispatcherModal && isUserLoggedIn && !isDispatcherEnabled ? (
        <EnableDispatcherModal
          onClose={() => setShowDispatcherModal(false)}
          onSuccess={() => showModal(modalData)}
        />
      ) : null}

      {modalShown && isUserLoggedIn && isDispatcherEnabled ? (
        <CollectNFTModal
          modalData={modalData}
          shown={modalShown}
          close={() => {
            toggleModal(false);
          }}
        />
      ) : null}
      <div
        className={`text-[#ffffff] font-bold text-[20px] ml-[15px] lg2:ml-[40px] xl:ml-[40px] leading-[32px] justify-center`}
      >
        Collect NFTs
      </div>

      {isLoading && !isFirstTimeLoading.current ? (
        <div className="text-center">
          <ClipLoader />
        </div>
      ) : null}

      {!isUserLoggedIn && !isLoading ? (
        <div className="bg-[#00000099] text-[#ffffff] text-[20px] rounded-[16px]  mt-[16px] h-[512px] flex items-center justify-center xl:ml-[35px] xl:mr-[35px] ml-[15px] mr-[15px]">
          <div className="text-center font-medium text-[16px]">
            <div>Oops! It's Empty</div>
            <div className="flex items-center mt-[5px]">
              <span className="leading-[26px]">Sign in to view your </span>
              <span className="mx-[5px]">
                <Image
                  src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                  alt="Lens Icon"
                  width="19"
                  height="19"
                />
              </span>
              <span className="leading-[26px]">NFTs </span>
            </div>
          </div>
        </div>
      ) : null}

      {allData.current.length == 0 && !isLoading && isUserLoggedIn ? (
        <div className="bg-[#00000099]  text-[#ffffff] text-[20px] rounded-[16px] mt-[16px] h-[512px] flex items-center justify-center xl:ml-[35px] xl:mr-[35px] ml-[15px] mr-[15px]">
          <div className="text-center font-medium text-[16px] ">
            <div>Oops! It's Empty</div>
            <div className="flex items-center">
              <span className="leading-[26px]">Looks like you haven't </span>
              <span className="mx-[5px]">
                <Image
                  src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                  alt="Lens Icon"
                  width="19"
                  height="19"
                />
              </span>
              <span className="leading-[26px]">any NFTs yet.. vote your</span>
            </div>
            <div className="leading-[26px]">favourites to start collecting</div>
            <button
              className={`${collectNFTModalStyles.collectButton} flex  justify-center py-[7px] mt-[20px]`}
            >
              <span className="pl-[11px]">Vote Now!</span>
            </button>
          </div>
        </div>
      ) : null}

      {allData.current.length > 0 && !isLoading && (
        <div
          className={`${styles.scroll} flex flex-wrap  gap-y-[25px] justify-center max-h-[512px] overflow-y-scroll mt-[16px] m-auto`}
          onScroll={handleScroll}
        >
          {allData.current.length > 0 &&
            allData.current.map((ele, index) => {
              return (
                <Card
                  key={index}
                  cardDetails={ele}
                  showCollectModal={() => showModal(ele)}
                  style={{ marginLeft: "6px", marginRight: "6px" }}
                />
                // <div
                //   key={index}
                //   className=" h-[512px] rounded-[16px] relative overflow-hidden"
                // >
                //   <img
                //     className="w-full rounded-[16px]"
                //     src={ele.image}
                //     alt="Lens Icon"
                //   />
                //   <div className={`${styles.nftDetails} p-[15px]`}>
                //     <div className="flex items-start justify-between">
                //       <span className={`${styles.nftTitle}`}>{ele?.title}</span>
                //       <span>
                //         <Image
                //           src="https://static.plgworks.com/assets/images/non/vote/lens-icon.png"
                //           alt="Lens icon"
                //           width="20"
                //           height="20"
                //         />
                //       </span>
                //     </div>
                //     <div className="flex justify-between items-center mt-[14px] mb-[22px]">
                //       <div className="flex items-center font-medium text-[#ffffff99] text-[16px] leading-[26px]">
                //         <span>{ele?.handle}</span>
                //         {/* <span>.</span>
                //         <span>Follow</span> */}
                //       </div>
                //       <div className="flex items-center font-medium text-[#ffffff99] text-[16px] leading-[26px]">
                //         <span></span>
                //         <span>Show Prompt</span>
                //       </div>
                //     </div>
                //     <button
                //       className={`${
                //         ele.hasCollected
                //           ? styles.alreadyCollectedButton
                //           : styles.collectButton
                //       } flex items-center justify-center py-[7px]`}
                //       onClick={() => {
                //         showModal(ele);
                //       }}
                //     >
                //       <span>
                //         <Collect />
                //       </span>
                //       <span className="font-bold text-[16px] leading-[26px] ml-[8px]">
                //         {ele.hasCollected
                //           ? "You have already collected this"
                //           : "Collect Now"}
                //       </span>
                //     </button>
                //   </div>
                // </div>
              );
            })}

          {/* <div className={styles.emptyImageCell}>
          <Image
            src="https://static.plgworks.com/assets/images/non/generate-default.png"
            alt="Lens Icon"
            width="60"
            height="60"
          />
        </div> */}
        </div>
      )}
    </div>
  );
}

export default CollectNFT;
