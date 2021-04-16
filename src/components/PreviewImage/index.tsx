import React from "react";
import { PhotoProvider, PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/index.css";

/**
 * Taro.previewImage 在h5无法缩放图片
 * 存在问题：ios的长按和photoClosable的点击关闭预览事件冲突
 * @see https://gitee.com/MinJieLiu/react-photo-view/tree/master
 */

interface IProps {
  visible: boolean;
  current: number;
  urls: string[];
  onClose: () => void;
  onChange: (arg: number) => void;
  photoClosable?: boolean;
}

const PreviewImage: React.FC<IProps> = ({
  visible,
  current,
  urls,
  onClose,
  onChange,
  photoClosable = false,
  ...rest
}) => {
  return (
    <PhotoProvider {...rest}>
      <PhotoSlider
        images={urls.map((item) => ({ src: item }))}
        photoClosable={photoClosable}
        visible={visible}
        onClose={onClose}
        index={current}
        onIndexChange={onChange}
      />
    </PhotoProvider>
  );
};
export default PreviewImage;
