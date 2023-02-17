/**
 * DO NOT EDIT THIS PAGE
 */
import { NextApiHandler } from "next";
import { paginate, searchJokes } from "@aquacloud/internal";

const Handler: NextApiHandler = async (req, res) => {
  const {
    query = "money",
    page = "1",
    pageSize = "15",
  } = req.query as Partial<Record<string, string>>;
  const result = await searchJokes(query);

  if (!result.ok) {
    return res.status(result.error.status ?? 500).send(
      result.error.response?.data ?? {
        message: result.error.response?.statusText ?? "Internal Server Error",
      }
    );
  }

  const pagedResponse = paginate(
    result.data.data.result,
    parseInt(page),
    parseInt(pageSize)
  );

  return res.send(pagedResponse);
};

export default Handler;
