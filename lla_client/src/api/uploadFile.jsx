import axios from "axios";

export const uploadFile = async (file) => {
  const { data: signData } = await axios.get("/quiz/get-signature");
  const data = new FormData();
  data.append("file", file);
  data.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
  data.append("signature", signData.signature);
  data.append("timestamp", signData.timestamp);
  return axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/auto/upload`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: function (e) {
        console.log(e.loaded / e.total);
      },
    }
  );
};
