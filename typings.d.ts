export type PostProps = {
    _id: string;
    content: string;
    cover: string;
    createdAt: string;
    summary: string;
    title: string;
    updatedAt: string;
    author: {
        username: string;
        _id: string;
    }
}