import { Camera, CameraType } from "expo-camera";
import MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet } from "react-native";

export default function App() {

  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState<Camera>(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  async function takePicture() {
    if (camera) { 
      //Tirar uma foto
      const photo = await camera.takePictureAsync();
      console.log(photo.uri);
      setImage(photo.uri);
      //Salvar a foto na galeria
      await MediaLibrary.saveToLibraryAsync(image);
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(minhaCamera) => setCamera(minhaCamera)}
        style={styles.styleCamera}
        type={CameraType.back}
        ratio={'1:1'}
      />
      <Button title="Tirar Foto" onPress={() => { takePicture() }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  styleCamera: {
    aspectRatio: 1,
    flex: 1
  }
});

