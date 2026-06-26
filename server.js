import "dotenv/config.js";

import app from "./src/app.js";
import connectDB from "./src/common/config/db/db.js";

const PORT = process.env.PORT || 8080;

const main = async () => {
  try {
    // DB setup and start
    await connectDB();

    app.listen(PORT, (req, res) => {
      console.log(
        `server is up and runnig on port ${PORT} in ${process.env.NODE_ENV} mode`,
      );
    });
  } catch (error) {
    console.log("Error while start the server");
  }
};

main();
