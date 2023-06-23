"use client";
import Image from "next/image";
import jumpJeans from "@/public/jumpJeans.gif";
import gromit from "@/public/gromit.png";
import styles from "./page.module.css";
import { useGetMenuListQuery } from "@/stores/services/menuList";
import React, { useEffect, useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useGetMenuListQuery(null);
  const [menuList, setMenuList] = useState<string[]>([]);
  const [menu, setMenu] = useState<string>("");
  const [isClickButton, setIsClickButton] = useState(false);
  const [showGromit, setShowGromit] = useState(false);
  useEffect(() => {
    if (data) {
      setMenuList(["🎲랜덤🎲", ...Object.keys(data)]);
    }
  }, [data]);
  const onClickGetMenuButton = (e: React.MouseEvent<any>) => {
    setIsClickButton((v) => true);
    let timer: NodeJS.Timeout | null = null;
    const { type } = e.currentTarget.dataset;
    if (type === "🎲랜덤🎲") {
      const arr: string[] = [];
      const dataArr: string[][] = Object.values(data);
      for (let i = 0; i < dataArr.length; i++) {
        for (let j = 0; j < dataArr[i].length; j++) {
          arr.push(dataArr[i][j]);
        }
      }
      timer = setInterval(() => {
        setMenu(arr[Math.floor(Math.random() * arr.length)]);
      }, 77);
    } else {
      timer = setInterval(() => {
        setMenu(data[type][Math.floor(Math.random() * data[type].length)]);
      }, 77);
    }
    setTimeout(() => {
      if (timer) clearTimeout(timer);
      setIsClickButton((v) => false);
    }, 1500);
  };
  return (
    <main className={styles.main}>
      <h1>오늘 점심 뭐먹지? 🤔</h1>
      <Image src={jumpJeans} alt={"점프진스"} priority />
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>새로고침 후 다시 시작해주세요</p>
      ) : data ? (
        <div className={styles.button_wrap}>
          {menuList?.map((v, i) => (
            <button
              key={i}
              className={styles.button}
              data-type={v}
              onClick={onClickGetMenuButton}
              disabled={isClickButton}
            >
              {v}
            </button>
          ))}
        </div>
      ) : null}
      <h2>{menu}</h2>
      <Image
        src={gromit}
        alt={"월레스와 그로밋"}
        className={styles.gromit}
        onLoad={() => setShowGromit(true)}
        style={{
          zIndex: -1,
          animationPlayState: showGromit ? "running" : "paused",
          opacity: showGromit ? 1 : 0,
          transition: "2s",
        }}
      />
    </main>
  );
}
