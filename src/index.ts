import dotenv from "dotenv";
import router from "./router";

dotenv.config();

const app = router();

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 share.cny.sh is running...`);
})
