/* tslint:disable:no-console */

export function printError(err) {
  if (!err.errors) { return; }
  return err.errors.forEach((e) => {
    console.log(`[${e.code}] ${e.id}: ${e.details}`);
  });
}

export function printResponse(res, indentation = 2) {
  console.log(JSON.stringify(res.data, null, indentation));
}

export function handleResponse(err, res) {
  if (err) { return printError(err); }
  printResponse(res);
}
