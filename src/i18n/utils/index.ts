export async function loadMessages(locale: string) {
  const home = (await import(`../../i18n/messages/${locale}/home.json`))
    .default;
  const actions = (await import(`../../i18n/messages/${locale}/actions.json`))
    .default;
  const utils = (await import(`../../i18n/messages/${locale}/utils.json`))
    .default;
  const places = (await import(`../../i18n/messages/${locale}/places.json`))
    .default;
  const wanderlust = (await import(`../../i18n/messages/${locale}/wanderlust.json`))
    .default;
  const contact = (await import(`../../i18n/messages/${locale}/contact.json`))
    .default;
  const aboutUs = (await import(`../../i18n/messages/${locale}/aboutUs.json`))
    .default;
  const forPlaces = (await import(`../../i18n/messages/${locale}/forPlaces.json`))
    .default;
    const subscriptions = (await import(`../../i18n/messages/${locale}/subscriptions.json`))
    .default;

  return {
    home,
    actions,
    utils,
    places,
    wanderlust,
    contact,
    aboutUs,
    forPlaces,
    subscriptions
  };
}
