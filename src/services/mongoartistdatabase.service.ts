import ArtistDatabase from "./artistdatabase.service";
import { Artist } from "@/interfaces/artists.interface";
import { Collection, MongoClient, ObjectId, WithId } from "mongodb";

class MongoArtistDatabase implements ArtistDatabase {

    private client: MongoClient;
    private collection: Collection<Artist>;

    // Database Name
    private dbName = 'RebelChallengeArtistDatabase';
    
    constructor(url:string, secret:string) {    
        const uri = `mongodb+srv://dbUser:${secret}@${url}/?retryWrites=true&w=majority`;
        this.client = new MongoClient(uri);
        console.log('Created mongo client at ' + uri);
    }

    async connect() {
    
        // Use connect method to connect to the server
        try {
            console.log('Attempting to connect to server');
            await this.client.connect();
            console.log('Connected successfully to server');
            const db = this.client.db(this.dbName);
            this.collection = db.collection('artists');
        } catch (e) {
            console.log('Bad Connection: ' + e.toString())
        }
    }

    list(): Promise<Artist[]> {
        return this.collection.find({}).toArray();
    }

    create(artists: Artist[]): Promise<void> {
        return this.collection.insertMany(artists).then((artists)=>{
            console.log('inserted %d', artists.insertedCount)
        }).catch((reason)=>{
            console.error("Mongo error: ",reason)});
    }

    drop() {
        return this.collection.drop();
    }
    
    findOne(id: string): Promise<Artist> {
        return this.collection.findOne({_id:new ObjectId(id)});
    };
}

export default MongoArtistDatabase;