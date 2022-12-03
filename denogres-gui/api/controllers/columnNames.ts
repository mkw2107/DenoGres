import { columnNames } from "../repositories/dbRepo.ts";
import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";

interface ContextWithParams extends Context {
  params: {
    table: string;
  };
}

export default async ({
  params,
  response,
}: ContextWithParams) => {
  const tableName = params.table;

  if (!tableName) {
    response.status = 400;
    response.body = { msg: "Invalid table name" };
    return;
  }

  const foundTable = await columnNames(tableName);
  if (!foundTable) {
    response.status = 404;
    response.body = { msg: `Table with name ${tableName} not found` };
    return;
  }

  response.body = foundTable;
};