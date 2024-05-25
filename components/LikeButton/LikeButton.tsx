import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./LikeButton.module.css";
import LikeIcon from "../../assets/like.svg";

type onLikeButtonProps = {
  ansId: string;
};

const LikeButton = ({ ansId }: onLikeButtonProps) => {
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

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

  return (
    <div>
      <button onClick={onLikeButton} className={styles.likeBtn}>
        <Image
          src={LikeIcon}
          alt="like button"
          style={{ width: "auto", height: "auto" }}
        />
        <p>{like}</p>
      </button>
    </div>
  );
};

export default LikeButton;
