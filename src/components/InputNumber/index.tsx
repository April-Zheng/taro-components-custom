import { Input, View } from "@tarojs/components";
import React from "react";
import classnames from "classnames";

import "./index.scss";

/**
 * taro-ui InputNumber组件在小程序的应用存在的问题：
 * 设置了最小值后，无法删除最小值，只能输入以最小值为起始的值
 */

interface IProps {
  disabled?: boolean;
  value: any;
  min: number;
  max: number;
  onChange: (arg: any) => void;
  /** @default 1 */
  step?: number;
}

export default function InputNumber(props: IProps) {
  const { disabled, min, max } = props;

  const addNum = (num1, num2) => {
    let sq1, sq2, m;
    try {
      sq1 = num1.toString().split(".")[1].length;
    } catch (e) {
      sq1 = 0;
    }
    try {
      sq2 = num2.toString().split(".")[1].length;
    } catch (e) {
      sq2 = 0;
    }
    m = Math.pow(10, Math.max(sq1, sq2));
    return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
  };

  const handleChangeStep = (type) => {
    const { step = 1 } = props;
    let { value } = props;

    if (!value || Number.isNaN(+value)) {
      value = min;
    }

    if (disabled) return null;

    if (type === "minus") {
      value = addNum(value, -step);
    } else if (type === "plus") {
      value = addNum(value, step);
    }
    console.log({ value, min, max }, "---handleChangeStep---");
    if (value < min || value > max) return null;

    handleEmit(value, type);
  };

  const handleMinus = () => {
    props.value > min && handleChangeStep("minus");
  };

  const handlePlus = () => {
    props.value < max && handleChangeStep("plus");
  };

  const handleValue = (e, type?: string) => {
    let { value } = e.detail;
    if (type === "blur") {
      let blurVal = value;
      if (!value) {
        blurVal = min;
      }
      if (value > max) blurVal = max;
      setTimeout(() => {
        handleEmit(blurVal, type);
      }, 10);
      return;
    }

    value = +value;
    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }
    return value;
  };

  const handleBlur = (e, type) => {
    const value = handleValue(e, type);
    handleEmit(value, type);
  };

  const handleEmit = (val, type?: string) => {
    const data: any = {
      value: val,
    };
    if (type) data.type = type;
    props.onChange(data);
  };

  return (
    <View className="input-number-com">
      <View
        className={classnames("input-number-com__minute", {
          disabled: props.value <= min,
        })}
        onClick={handleMinus}
      >
        -
      </View>
      <Input
        value={props.value}
        disabled={disabled}
        className="input-number-com__input"
        type="number"
        cursor={-1}
        onBlur={(e) => handleBlur(e, "blur")}
        onInput={(e) => handleBlur(e, "input")}
      />
      <View
        className={classnames("input-number-com__plus", {
          disabled: props.value >= max,
        })}
        onClick={handlePlus}
      >
        +
      </View>
    </View>
  );
}
