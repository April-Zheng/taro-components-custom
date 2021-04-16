import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import "./index.scss";

export default function Home() {
  const pages = [
    {
      name: "图片预览",
      path: "/pages/preview/index",
    },
  ];
  const onNavigateTo = (item) => {
    Taro.navigateTo({ url: item.path });
  };
  return (
    <View className="home-container">
      {pages.map((item) => {
        return (
          <View
            className="routes-item"
            key={item.path}
            onClick={() => onNavigateTo(item)}
          >
            {item.name}
          </View>
        );
      })}
    </View>
  );
}
