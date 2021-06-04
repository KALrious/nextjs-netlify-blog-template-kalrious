import Layout from "../../components/Layout";
import BasicMeta from "../..//components/meta/BasicMeta";
import OpenGraphMeta from "../..//components/meta/OpenGraphMeta";
import TwitterCardMeta from "../..//components/meta/TwitterCardMeta";

const Index = () => {
    const url = "/cheat-sheet";
    const title = "All cheat sheet";
    return(
        <Layout>
            <BasicMeta url={url} title={title} />
            <OpenGraphMeta url={url} title={title} />
            <TwitterCardMeta url={url} title={title} />TOTO</Layout>
    )
}

export default Index;
