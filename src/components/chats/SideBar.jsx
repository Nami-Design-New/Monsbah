import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useGetChats from "./../../hooks/chat/useGetChats";
import axiosInstance from "../../utils/axiosInstance";
import ChatCard from "./../../ui/cards/ChatCard";
import ConfirmationModal from "../../ui/modals/ConfirmationModal";
import ChatItemLoader from "./../../ui/loaders/ChatItemLoader";

export default function SideBar({ setShowChats }) {
  const { t } = useTranslation();
  const sideRef = useRef(null);
  const queryClient = useQueryClient();
  const [checkedState, setCheckedState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState();
  const [selectedChats, setSelectedChats] = useState([]);

  const {
    data: chats,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChats();

  useEffect(() => {
    const handleScroll = () => {
      if (!sideRef.current) return;

      const section = sideRef.current;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (
        sectionBottom <= viewportHeight + 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/client/chat/delete", {
        ids: selectedChats,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["chats"] });
        setSelectedChats([]);
        setCheckedState(false);
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const selectAll = () => {
    setSelectedChats(chats.map((chat) => chat.id));
  };

  const areArraysEqual = () => {
    const arr1 = chats?.map((chat) => chat.id) || [];
    if (arr1.length !== selectedChats.length) return false;
    return arr1.every((val) => selectedChats.includes(val));
  };

  return (
    <aside ref={sideRef}>
      {/* <button onClick={() => setShowChats(false)} className="close_sidebar">
        <i className="fa-regular fa-x" aria-hidden="true"></i>
      </button> */}
      <div className="checkAll_field">
        <Form.Check
          type="checkbox"
          label={t("chat.check")}
          checked={checkedState}
          onChange={() => setCheckedState(!checkedState)}
        />
        {checkedState && (
          <div className="d-flex align-items-center gap-3">
            {!areArraysEqual() && (
              <button onClick={selectAll}>{t("chat.selectAll")}</button>
            )}
            {selectedChats?.length > 0 && (
              <button className="delete_all" onClick={() => setShowModal(true)}>
                <i className="fa-regular fa-trash" aria-hidden="true"></i>
                {t("chat.delete")}
              </button>
            )}
          </div>
        )}
      </div>
      {chats?.map((chat) => (
        <ChatCard
          key={chat.id}
          chat={chat}
          checkedState={checkedState}
          setSelectedChats={setSelectedChats}
          selectedChats={selectedChats}
          setShowChats={setShowChats}
        />
      ))}

      {(isLoading || isFetchingNextPage) &&
        Array(3)
          .fill(0)
          .map((_, index) => <ChatItemLoader key={index} />)}

      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        eventFun={handleDelete}
        loading={loading}
        type="delete"
        buttonText={t("chat.delete")}
        text={t("chat.areYouSureYouWantDeleteThisChats")}
      />
    </aside>
  );
}
