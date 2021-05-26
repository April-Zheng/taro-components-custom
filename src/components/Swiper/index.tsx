import {
  Swiper,
  SwiperItem,
  Video,
  Image,
  View,
  Text,
} from "@tarojs/components";
import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";

enum SwiperItemType {
  IMAGE = "image",
  VIDEO = "video",
}

export interface ItemProps {
  type: SwiperItemType;
  url: string;
  poster?: string;
}
interface IProps {
  items: ItemProps[];
  showNums?: boolean;
  videoProps?: any;
  [name: string]: any;
}

/**
 * 兼容视频&图片的轮播组件，轮播过程中停止播放视频
 */
export default function SwiperIV(props: IProps) {
  const { items, showNums, videoProps, ...restProps } = props;
  const [current, setCurrent] = useState<number>(0);
  const videoContext = Taro.createVideoContext("video");

  const [isShow, setIsShow] = useState<boolean>(true);
  useEffect(() => {
    const elevideo: any = document.getElementById("video");
    elevideo?.addEventListener("play", () => {
      //播放开始执行的函数
      console.log("开始播放");
      setIsShow(false);
    });
    elevideo?.addEventListener("pause", () => {
      //播放开始执行的函数
      console.log("暂停播放");
      setIsShow(true);

      console.log(elevideo);
    });
    return () => {
      elevideo?.removeEventListener("play", () => {});
      elevideo?.removeEventListener("pause", () => {});
    };
  }, []);
  return (
    <View className="swiper">
      <Swiper
        {...restProps}
        className="swiper-container"
        autoplay={isShow}
        onChange={(e) => {
          videoContext.pause();
          setCurrent(e.detail?.current);
        }}
      >
        {props.items?.map((item) => {
          return (
            <SwiperItem key={item.url}>
              {item.type === SwiperItemType.VIDEO && (
                <Video
                  {...videoProps}
                  style={{ width: "100%" }}
                  controls
                  autoplay={false}
                  id="video"
                  loop={false}
                  muted={false}
                  showFullscreenBtn
                  showPlayBtn
                  showCenterPlayBtn
                  poster={item.poster}
                  src={item.url}
                />
              )}
              {item.type === SwiperItemType.IMAGE && (
                <Image mode="aspectFit" src={item.url} />
              )}
            </SwiperItem>
          );
        })}
      </Swiper>
      {isShow && props.showNums && props.items?.length && (
        <Text className="swiper-count">
          {current + 1}/{props.items?.length}
        </Text>
      )}
    </View>
  );
}

SwiperIV.type = SwiperItemType;
