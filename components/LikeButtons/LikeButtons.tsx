import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./LikeButtons.module.css";
import LikeIcon from "../../assets/like.svg";
import DisLikeIcon from "../../assets/dislike.svg";

type onLikeButtonsProps = {
  ansId: string;
};

const LikeButtons = ({ ansId }: onLikeButtonsProps) => {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);

  useEffect(() => {
    const storedLike = localStorage.getItem(`like_${ansId}`);
    if (storedLike) {
      setLike(parseInt(storedLike, 10));
    }
  }, [ansId]);

  const onLikeButton = () => {
    console.log("Like is clicked");
    const newLike = isLiked ? like - 1 : like + 1;
    localStorage.setItem(`like_${ansId}`, newLike.toString());
    setLike(newLike);
    setIsLiked(!isLiked);
  };

  const onDislikeButton = () => {
    const newDisLike = isDisLiked ? disLike - 1 : disLike + 1;
    localStorage.setItem(`like_${ansId}`, newDisLike.toString());
    setDisLike(newDisLike);
    setIsDisLiked(!isDisLiked);
  };

  return (
    <>
      <div className={styles.likeDislikeBtns}>
        <button onClick={onLikeButton} className={styles.likeBtn}>
          <Image
            src={LikeIcon}
            alt="like button"
            style={{ width: "auto", height: "auto" }}
          />
          <p>{like}</p>
        </button>

        <button onClick={onDislikeButton} className={styles.likeBtn}>
          <Image
            src={DisLikeIcon}
            alt="dislike button"
            style={{ width: "auto", height: "auto" }}
          />
          <p>{disLike}</p>
        </button>
      </div>
    </>
  );
};

export default LikeButtons;
