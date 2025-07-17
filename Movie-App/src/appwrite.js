const DATABASE_URL = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const API_KEY = import.meta.env.VITE_APPWRITE_API_KEY;
const client = new Client()
.setEndpoint('https://fra.cloud.appwrite.io/v1')
.setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, queries [)

    } catch (error) {
        console.error('Error updating search count:', error);
    }
}