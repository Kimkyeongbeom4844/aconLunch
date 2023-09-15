"use client";
import Image from "next/image";
import jumpJeans from "@/public/jumpJeans.gif";
import gromit from "@/public/gromit.png";
import styles from "./page.module.css";
import { useGetMenuListQuery } from "@/stores/services/menuList";
import React, { useCallback, useEffect, useState } from "react";

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

  const menuLoadEffect = useCallback(
    (target: string[], time: number) => {
      return setInterval(() => {
        const result = target[Math.floor(Math.random() * target.length)];
        setMenu(result);
      }, time);
    },
    [menu]
  );

  const onClickGetMenuButton = (e: React.MouseEvent<any>) => {
    setIsClickButton(true);
    let timer: NodeJS.Timeout | null = null;
    const { type } = e.currentTarget.dataset;
    if (type === "🎲랜덤🎲") {
      const arr: string[] = [];
      const dataArr: string[][] = Object.values(data);
      for (let i = 0; i < dataArr.length; i++) {
        for (let j = 0; j < dataArr[i].length; j++) {
          if (data["🍩디저트🍩"].includes(dataArr[i][j])) continue;
          arr.push(dataArr[i][j]);
        }
      }
      timer = menuLoadEffect(arr, 77);
    } else {
      timer = menuLoadEffect(data[type], 77);
    }
    setTimeout(() => {
      if (timer) clearTimeout(timer);
      setIsClickButton(false);
    }, 1500);
  };

  const onClickGromitImage = () => {
    alert("축하합니다! 찾았습니다 😊");
    const $a = document.createElement("a");
    if (typeof process.env.GROMIT === "string") {
      $a.href = process.env.GROMIT;
    }
    $a.target = "_blank";
    $a.click();
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
        title="동쪽그로밋"
        alt={"월레스와 그로밋"}
        className={styles.gromit}
        onLoadingComplete={() => setShowGromit(true)}
        onClick={onClickGromitImage}
        style={{
          animationPlayState: showGromit ? "running" : "paused",
          opacity: showGromit ? 1 : 0,
        }}
      />
    </main>
  );
}
