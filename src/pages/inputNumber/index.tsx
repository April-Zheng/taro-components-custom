import InputNumberCom from "@/components/InputNumber";
import { View } from "@tarojs/components";
import React, { useState } from "react";

const MIN_VALUE = 1;
const MIN_VALUE_ZERO = 0;

export default function InputNumber() {
  const [count, setCount] = useState<number>(MIN_VALUE);
  const [count2, setCount2] = useState<number>(MIN_VALUE_ZERO);
  return (
    <View className="input-number-wrapper">
      <InputNumberCom
        value={count}
        min={1}
        max={200}
        onChange={(data) => {
          console.log(data, "---onChange---");
          setCount(data.value);
        }}
      />
      <InputNumberCom
        value={count2}
        min={MIN_VALUE_ZERO}
        step={0.1}
        max={200}
        onChange={(data) => setCount2(data.value)}
      />
    </View>
  );
}
