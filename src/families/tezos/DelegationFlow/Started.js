// @flow
import React, { useCallback } from "react";
import { StyleSheet, View, Linking } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Trans } from "react-i18next";
import colors from "../../../colors";
import { ScreenName } from "../../../const";
import { TrackScreen } from "../../../analytics";
import Button from "../../../components/Button";
import LText from "../../../components/LText";
import ExternalLink from "../../../components/ExternalLink";
import BulletList, { BulletGreenCheck } from "../../../components/BulletList";
import NavigationScrollView from "../../../components/NavigationScrollView";
import IlluStaking from "../IlluStaking";
import { urls } from "../../../config/urls";

const forceInset = { bottom: "always" };

type Props = {
  navigation: any,
  route: { params: any },
};

export default function DelegationStarted({ navigation, route }: Props) {
  const onNext = useCallback(() => {
    navigation.navigate(ScreenName.DelegationSummary, {
      ...route.params,
    });
  }, [navigation, route.params]);

  const howDelegationWorks = useCallback(() => {
    Linking.openURL(urls.delegation);
  }, []);

  return (
    <SafeAreaView style={styles.root} forceInset={forceInset}>
      <NavigationScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
      >
        <TrackScreen category="DelegationFlow" name="Started" />
        <IlluStaking />
        <LText semiBold style={styles.title}>
          <Trans secondary i18nKey="delegation.started.title" />
        </LText>
        <LText secondary style={styles.description}>
          <Trans i18nKey="delegation.started.description" />
        </LText>
        <BulletList
          Bullet={BulletGreenCheck}
          list={[
            <Trans i18nKey="delegation.started.steps.0" />,
            <Trans i18nKey="delegation.started.steps.1" />,
            <Trans i18nKey="delegation.started.steps.2" />,
          ].map(wording => (
            <LText secondary semiBold style={styles.bulletItem}>
              {wording}
            </LText>
          ))}
        />
        <View style={styles.howDelegationWorks}>
          <ExternalLink
            event="DelegationStartedHowDelegationWorks"
            onPress={howDelegationWorks}
            text={<Trans i18nKey="delegation.howDelegationWorks" />}
            ltextProps={{
              secondary: true,
            }}
          />
        </View>
      </NavigationScrollView>
      <View style={styles.footer}>
        <Button
          event="DelegationStartedBtn"
          onPress={onNext}
          title={<Trans i18nKey="delegation.started.cta" />}
          type="primary"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingVertical: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    lineHeight: 33,
    color: colors.darkBlue,
    paddingVertical: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.darkBlue,
    textAlign: "center",
    marginBottom: 16,
  },
  bulletItem: {
    fontSize: 14,
    color: colors.black,
  },
  howDelegationWorks: {
    marginTop: 32,
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.live,
    flexDirection: "row",
  },
  howDelegationWorksText: {
    color: colors.live,
    fontSize: 14,
  },
  footer: {
    padding: 16,
  },
});
