
const QueryBuilder = require('node-querybuilder');
const settings = {
    host     : process.env.APP_URL,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
};
const querybuilder = new QueryBuilder(settings, 'mysql', 'pool');

class QueryBuilders { 
    constructor(querybuilder) {
        this.querybuilder = querybuilder;
    }

    static async getTable(table,select,where) {     ``
       
        try {
            const qb = await querybuilder.get_connection();
            const response = await qb.select(select).where(where).get(table);
    
            console.log("Query Ran: " + qb.last_query());
            return response;
        } catch (err) {
            return console.error("Uh oh! Couldn't get results: " + err.msg);
        } 
        finally {
            querybuilder.disconnect();
        }
    } 

    static async save(name,data) {

       try {
            // const Iterator =  Object.entries(object1).map((key , value) => `${key}`)//.join(','); //----- Trying yo using map function to print Object Entries
            let Iterator = [];
            for (const [key, value] of Object.entries(data)) {
                Iterator.push(`'${value}'`);
            }
            Iterator.join(',');
            const keys = Object.keys(data).join(',');
            let qry  = `INSERT INTO ${name} (${keys}) VALUES (${Iterator})`;
        
            return await db.query(qry);
        } catch (err) {
            console.error("Err - " + err)
            return err.msg;
        }
    }

    static async update(name, data, where) {

        try {
            const qb = await querybuilder.get_connection();
            const response = await qb.where(where).set(data).update(name);
            qb.release();
            if (err) return console.error(err);
        } catch (err){
            return console.error("Error : " + err.msg);
        }
    }

    static async delete(name,where) {

        try {
            const qb = await querybuilder.get_connection();
            const response = await qb.where(where).delete(name);

            console.log("Query Ran: " + qb.last_query());

        } catch (err){
            return console.error("Error : " + err.msg);
        }
    }

    static async getTableWithJoin(table,select,where,join) {
       
        try {
            const qb = await querybuilder.get_connection();
            const response = await  qb.select(select).from(table)
            .join(join)
            .where(where)
            .get(callback);
            console.log("Query Ran: " + qb.last_query());
            return response;
        } catch (err) {
            return console.error("Uh oh! Couldn't get results: " + err.msg);
        } finally {
            querybuilder.disconnect();
        }
    } 
 
}

module.exports = QueryBuilders