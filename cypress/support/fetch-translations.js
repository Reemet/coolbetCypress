import { keyBy, filter, forEach, some } from 'lodash';
import fs from 'fs';
import request from 'request-promise';
import * as path from 'path';

const TRANSLATIONS = {
    en: {},
    ca: {},
    fi: {},
    no: {},
    sv: {},
    et: {},
    ru: {},
    es: {},
    de: {},
    is: {},
    cl: {},
    da: {},
};

const folderPath = path.resolve('./cypress/fixtures');

const excludedTranslationKeyPrefixes = ['sb.category', 'casino.game', 'sb.market-type'];

function downloadAllTranslations() {
    console.log('Downloading all translations');
    return request({
        method: 'GET',
        json: true,
        uri: 'https://www.coolbet.com/s/l10n/l10n/',
        resolveWithFullResponse: true,
    });
}

function removeUnneededTranslations(translations) {
    return filter(
        translations,
        translation => !some(excludedTranslationKeyPrefixes, prefix => translation.id.startsWith(prefix)),
    );
}

function getDictionaryByTranslationId(translations) {
    return keyBy(translations, 'id');
}

async function saveAllTranslations(allTranslationsResponse) {
    const allTranslations = allTranslationsResponse.body;
    const filteredTranslations = removeUnneededTranslations(allTranslations);
    const translationsDictionary = getDictionaryByTranslationId(filteredTranslations);

    forEach(translationsDictionary, translation => {
        forEach(Object.keys(TRANSLATIONS), language => {
            if (language === 'en') {
                TRANSLATIONS[language][translation.id] = translation.text && translation.text.en;
                return;
            }

            TRANSLATIONS[language][translation.id] =
                translation.text && (translation.text[language] || translation.text.en);
        });
    });

    const lastUpdatedTime = translationsDictionary.__last_updated.value;

    Object.keys(TRANSLATIONS).forEach(language => {
        const languageTranslations = TRANSLATIONS[language];
        fs.writeFileSync(`${folderPath}/${language}.json`, JSON.stringify(languageTranslations));
    });

    fs.writeFileSync(`${folderPath}/last-updated.json`, JSON.stringify({ lastUpdated: lastUpdatedTime }));
    console.log('Translations saved');
}

downloadAllTranslations().then(saveAllTranslations);