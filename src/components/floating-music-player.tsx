import library from "@/assets/data/library.json";
import { fontSize } from "@/constants/tokens";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import NextButton from "./floating-music-player/next-button";
import PlayPauseButton from "./floating-music-player/play-pause-button";
import { unknownTrackImageUri } from "@/constants/images";
import PreviousButton from "./floating-music-player/previous.button";
import useLastActiveTrack from "@/hooks/useLastActiveTrack";
import { MovingText } from "./floating-music-player/moving-text";
import { router } from "expo-router";

export default function FloatingMusicPlayer() {
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  //   displayTrack = library[1];
  const displayTrack = activeTrack || lastActiveTrack;

  const handleOnPress = () => {
    router.navigate("/player");
  };

  if (!displayTrack) return null;

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        backgroundColor: "#000",
        padding: 8,
        borderWidth: 1,
        borderColor: "#80808065",
        borderRadius: 16,
      }}
      activeOpacity={0.9}
      onPress={handleOnPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 8,
          }}
          source={{
            uri: displayTrack.artwork ?? unknownTrackImageUri,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
            gap: 8,

            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <View
            style={{
              flex: 1,
              overflow: "hidden",
            }}
          >
            <MovingText
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: fontSize.sm,
                // maxWidth: "90%",
              }}
              animationThreshold={10}
              text={displayTrack?.title || ""}
            />

            {/* <Text style={{ color: "#ddd", fontSize: fontSize.sm }}>
              {displayTrack?.artist}
            </Text> */}
          </View>
          {/* <PreviousButton /> */}
          <PlayPauseButton />
          <NextButton />
        </View>
      </View>
    </TouchableOpacity>
  );
}
