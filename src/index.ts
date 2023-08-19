import dotenv from "dotenv";
import router from "./router";

dotenv.config();

const app = router();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 share.cny.sh is running...`);
});
