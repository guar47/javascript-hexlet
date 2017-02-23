const csrf = async (registrationFormUrl, submitFormUrl, nickname) => {
  const gres = await get(registrationFormUrl);
  console.log(gres.status);
  if (gres.status !== 200) {
    return Promise.resolve(new Error(`Expected 200, but was ${gres.statusCode} for '${registrationFormUrl}'`));
  }
  const token = getToken(gres.data);
  const data = { nickname, token };
  const pres = await post(submitFormUrl, data);
  if (pres.status !== 302) {
    return Promise.resolve(new Error(`Expected 302, but was ${pres.statusCode} for '${submitFormUrl}'`));
  }
  return Promise.resolve();
};

export default csrf;
