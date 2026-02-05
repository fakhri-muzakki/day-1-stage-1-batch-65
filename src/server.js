import "dotenv/config";

import app from "./app.js";
import env from "./configs/env.js";

const PORT = env.app.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
