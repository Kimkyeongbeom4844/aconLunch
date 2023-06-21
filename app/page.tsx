"use client";
import Image from "next/image";
import jumpJeans from "@/public/jumpJeans.gif";
import styles from "./page.module.css";
import { useGetMenuListQuery } from "@/stores/services/menuList";
import React, { useEffect, useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useGetMenuListQuery(null);
  const [menuList, setMenuList] = useState<string[]>([]);
  const [menu, setMenu] = useState<string>("");
  useEffect(() => {
    if (data) {
      setMenuList(["랜덤", ...Object.keys(data)]);
    }
  }, [data]);
  const onClickGetMenuButton = (e: React.MouseEvent<any>) => {
    const { type } = e.currentTarget.dataset;
    if (type === "랜덤") {
      const arr = [];
      const dataArr: string[][] = Object.values(data);
      for (let i = 0; i < dataArr.length; i++) {
        for (let j = 0; j < dataArr[i].length; j++) {
          arr.push(dataArr[i][j]);
        }
      }
      setMenu(arr[Math.floor(Math.random() * arr.length)]);
    } else setMenu(data[type][Math.floor(Math.random() * data[type].length)]);
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
            >
              {v}
            </button>
          ))}
        </div>
      ) : null}
      <h2>{menu}</h2>
    </main>
  );
}
