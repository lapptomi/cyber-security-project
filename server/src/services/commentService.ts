/* eslint-disable @typescript-eslint/no-unused-vars */
import commentDao from "../dao/commentDao";
import createDomPurify from "dompurify";
import jsdom from "jsdom";

const { window } = new jsdom.JSDOM("");
const DOMPurify = createDomPurify(window);

export default {
  async getAllComments() {
    return await commentDao.getAllComments();
  },

  async createComment(comment: string) {
    /* 
      VULNERABILITY: Cross-site scripting (XSS):
      
      Here we have a XXS vulnerability, because we are not sanitizing the comment,
      before saving it to the database.
     
      So if you try to save a comment like: "<img onError=alert('Hacked.') src='invalid.url.com'>"
      It would trigger an alert on all users who renders the comment on their browser.

      We can fix this by sanitizing the comment before saving it to the database.
      Like below:
        const sanitizedComment = DOMPurify.sanitize(comment);
        const createdComment = await commentDao.createComment(sanitizedComment);
    */

    const createdComment = await commentDao.createComment(comment);
    return createdComment;
  },

  async deleteComments() {
    return await commentDao.deleteComments();
  },
};
