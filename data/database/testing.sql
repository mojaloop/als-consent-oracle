CREATE TABLE IF NOT EXISTS participant (
    `id` int(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `fspId` varchar(255) UNIQUE NOT NULL
    /* Do we need to store currency? */
);

CREATE TABLE IF NOT EXISTS consent (
    `id` int(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `participantId` int(10) unsigned NOT NULL,
    `consentId` varchar(255) UNIQUE NOT NULL,
    /* Any other data about a consent we need to store? */
    CONSTRAINT participantconsent_participantid_foreign FOREIGN KEY (participantId)
    REFERENCES participant (id)
);
