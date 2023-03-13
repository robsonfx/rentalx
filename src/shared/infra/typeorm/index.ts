import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// interface IOptions {
//   host: string;
// }

// getConnectionOptions().then(options => {
//   const newOptions = options as IOptions;
//   newOptions.host = 'database_ignite'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//   createConnection({
//     ...options,
//   });
// });

//em host passar o que foi definido no nome do container docker-composer.yaml
export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
}