/* @flow */
import React from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import LText from "./LText";
import colors from "../colors";
import { scrollToTop } from "../navigation/utils";

export default function HeaderTitle({ style, ...newProps }: *) {
  return (
    <TouchableWithoutFeedback onPress={scrollToTop}>
      <LText
        {...newProps}
        secondary
        semiBold
        style={[styleSheet.root, style]}
      />
    </TouchableWithoutFeedback>
  );
}

const styleSheet = StyleSheet.create({
  root: {
    color: colors.darkBlue,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
