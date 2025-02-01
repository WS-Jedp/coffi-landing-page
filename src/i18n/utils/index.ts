export async function loadMessages(locale: string) {
  const home = (await import(`../../i18n/messages/${locale}/home.json`))
    .default;
  const actions = (await import(`../../i18n/messages/${locale}/actions.json`))
    .default;
  const utils = (await import(`../../i18n/messages/${locale}/utils.json`))
    .default;
  const places = (await import(`../../i18n/messages/${locale}/places.json`))
    .default;

  return {
    home,
    actions,
    utils,
    places
  };
}
