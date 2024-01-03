-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `occupation` VARCHAR(191) NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateOfBirth` DATETIME(3) NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailAddresses` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `verifiedAt` DATETIME(3) NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `EmailAddresses_email_key`(`email`),
    UNIQUE INDEX `EmailAddresses_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhoneNumbers` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `verifiedAt` DATETIME(3) NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `PhoneNumbers_phone_key`(`phone`),
    UNIQUE INDEX `PhoneNumbers_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passwords` (
    `id` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `setAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `Passwords_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfilePhoto` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `publicId` VARCHAR(191) NOT NULL,
    `setAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `ProfilePhoto_id_key`(`id`),
    UNIQUE INDEX `ProfilePhoto_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Otp` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `setAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Otp_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Token_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalOfficer` (
    `id` VARCHAR(191) NOT NULL,
    `speciality` ENUM('Doctor', 'Nurse', 'Surgeon', 'Dentist', 'MidWife') NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `facilityName` VARCHAR(191) NULL,
    `role` ENUM('Student', 'Internee', 'Practitioner') NOT NULL,

    UNIQUE INDEX `MedicalOfficer_id_key`(`id`),
    UNIQUE INDEX `MedicalOfficer_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Posts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(500) NULL,
    `privacy` ENUM('Public', 'Private') NOT NULL DEFAULT 'Public',
    `category` ENUM('Photo', 'Event', 'Album', 'Video', 'Audio', 'File', 'Celebration') NOT NULL DEFAULT 'Photo',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostLikes` (
    `id` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostComments` (
    `id` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `messege` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostAsset` (
    `id` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `mediaType` VARCHAR(191) NULL,
    `publicId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostView` (
    `id` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `id` VARCHAR(191) NOT NULL,
    `userOneId` VARCHAR(191) NOT NULL,
    `userTwoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `receiverId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Forums` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `creatorId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Icons` (
    `id` VARCHAR(191) NOT NULL,
    `forumId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `publicId` VARCHAR(191) NOT NULL,
    `setAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Icons_forumId_key`(`forumId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Members` (
    `id` VARCHAR(191) NOT NULL,
    `forumId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Follow` (
    `id` VARCHAR(191) NOT NULL,
    `followerId` VARCHAR(191) NOT NULL,
    `followeeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmailAddresses` ADD CONSTRAINT `EmailAddresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhoneNumbers` ADD CONSTRAINT `PhoneNumbers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passwords` ADD CONSTRAINT `Passwords_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfilePhoto` ADD CONSTRAINT `ProfilePhoto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Otp` ADD CONSTRAINT `Otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalOfficer` ADD CONSTRAINT `MedicalOfficer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLikes` ADD CONSTRAINT `PostLikes_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLikes` ADD CONSTRAINT `PostLikes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostComments` ADD CONSTRAINT `PostComments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostComments` ADD CONSTRAINT `PostComments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostAsset` ADD CONSTRAINT `PostAsset_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostView` ADD CONSTRAINT `PostView_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_userOneId_fkey` FOREIGN KEY (`userOneId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_userTwoId_fkey` FOREIGN KEY (`userTwoId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Forums` ADD CONSTRAINT `Forums_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Icons` ADD CONSTRAINT `Icons_forumId_fkey` FOREIGN KEY (`forumId`) REFERENCES `Forums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Members` ADD CONSTRAINT `Members_forumId_fkey` FOREIGN KEY (`forumId`) REFERENCES `Forums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Members` ADD CONSTRAINT `Members_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followeeId_fkey` FOREIGN KEY (`followeeId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
