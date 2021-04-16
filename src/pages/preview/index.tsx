import { View, Image } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import PreviewImage from "@/components/PreviewImage";
import "./index.scss";

export default function Preview() {
  const [ImageList, setImageList] = useState<string[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [currentPic, setCurrentPic] = useState(0);

  const getImageList = () => {
    const data: string[] = [];
    for (let i = 0; i < 10; i++) {
      data.push("https://hyk51594176.github.io/rc-viewer/p4.jpeg");
    }
    setImageList(ImageList.concat(data));
  };

  const onPreviewImage = (item, index) => {
    setCurrentPic(index);
    setIsOpened(true);
  };

  useEffect(() => {
    getImageList();
  }, []);

  return (
    <View className="preview-image-container">
      {ImageList.map((item, index) => {
        return (
          <Image
            className="preview-image-item"
            key={index}
            src={item}
            onClick={() => onPreviewImage(item, index)}
          />
        );
      })}
      {isOpened && (
        <PreviewImage
          visible={isOpened}
          current={currentPic}
          urls={ImageList}
          onClose={() => setIsOpened(false)}
          onChange={(index) => setCurrentPic(index)}
        />
      )}
    </View>
  );
}
