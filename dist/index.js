import colors from "colors";
import server from "./server";
const port = process.env.PORT || 8000;
server.listen(8000, () => {
    console.log(colors.bgGreen.cyan.bold(`Server on port ${port}`));
});
//# sourceMappingURL=index.js.map