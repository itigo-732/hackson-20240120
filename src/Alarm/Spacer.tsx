import React, { FC } from 'react'
import {
    View,
} from 'react-native';

type SpacerProps = {
  size: number;
  horizontal?: boolean;
}

export const Spacer: FC<SpacerProps> = ({ size, horizontal }) => {
  return (
    <View
      style={
        horizontal
          ? { width: size, height: 'auto', display: 'inline-block', flexShrink: 0 }
          : { width: 'auto', height: size, flexShrink: 0  }
      }
    />
  )
}