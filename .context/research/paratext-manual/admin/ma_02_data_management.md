---
title: "MA 2. Data Management"
source_url: "https://manual.paratext.org/MA-2DM"
scraped_date: "2026-01-14"
---

# **MD: Data migration**

***Introduction*** Migration is the process of moving a project (including all settings files) from **Paratext 7** to Paratext 9. Paratext 9 does not have a migration feature. However, it is still possible to do this using Paratext 8. N.B.: Paratext 9 can read Paratext 8 projects.

***Where are we now?*** You have already installed Paratext 8 and you have a Paratext 7 project that you want to use in Paratext 9.

***Why is this important?*** In order for all Paratext 9 features to work, your Paratext 7 project must be migrated. Paratext 7 and Paratext 9 use different servers to send/receive, so there will be no way to share a project with Paratext 7 and Paratext 8 (or 9) users at the same time. As a result, the old server will be shut down at the end of December 2018. It is therefore important to migrate projects quickly.

Users can have Paratext 7 and Paratext 8 (and 9) installed at the same time and use either one, but no projects can be shared between them.

Once you have migrated the project, everyone must receive the migrated project and work only from Paratext 8 (or 9).

To migrate a project, you need a good Internet connection. If you usually work without an Internet connection, you can continue without a connection once the project has been migrated.

***What are you going to do?***

You are going to

- migrate a shared project:
- migrate a non-shared project:

**2.2 Migrating a shared project from Paratext 7**

If you are administering an existing project in Paratext 7 and want to migrate it to Paratext 8 (or 9), here is how to proceed.

**2.2.1 Preparing a Paratext 7 project for migration**

All users must update at the same time.

- All users must send/receive in **Paratext 7** (and then stop working in Paratext 7).
- The administrator confirms that the text is in good condition.
- The administrator launches **Paratext 8.**
- **File** > **Open project/resource**
- Click on the box at the bottom to display Paratext 7 projects
- Select the project to be migrated.

It will probably be marked as ‘v7, unregistered.’

The project may be marked as ‘v7’ without being described as unregistered, because a number of Paratext 7 projects were pre-registered in Paratext 8. If yours is one of these, you should continue with the migration, but you can skip the registration.

- Click **OK** to start migrating the project.
  - *The Migrate Shared Project dialogue box appears.*

*Paratext 8 may tell you that the project needs to be registered (if it is not pre-registered) and that it needs to be migrated to Paratext 8.*

**2.2.2 Register a project (before migrating the project)**

- Click the **Register Online** button
- Fill in the web form. (Fields marked with an asterisk are required.)
- Short name: The short name of the project will not be editable after this process.
- Full name: You can change the full name of the project.
- Paratext 8 requires a language identifier for your language. Use the **Search** function in the language name to find the Ethnologue code for your language.
- **Scope** Will the project be a complete Bible, a complete Bible including the deuterocanonical books, the New Testament, or some other group of books?
- The **type of translation** indicates whether the project is the first translation for this language, a revision of an existing translation, a new translation, or a translation with study notes, such as a study Bible.
- **Country**: Indicate the country where the language is spoken. You can type a few letters of the name and then select the desired country. You can specify more than one country if the language is spoken across borders.
- **Rights holder**: The rights holder would be the organisation from which you expect to obtain copyright for a printed edition. This can also be changed later.
- The last four fields allow you to add other information if it is relevant to describe your project. (None of these options are required.)
- You can indicate whether your project is confidential or not. Only registered users of Paratext 8 can view the names of standard projects; a confidential project will be hidden even from other Paratext 8 users.
- Another option is to mark a project as a test or training project. You can use this option for test projects you create or for projects you use for practice in a training course.
- Confirm that you agree to follow the FOBAI guidelines in your translation project and agree to store a backup copy of your project in the Digital Bible Library.

The ‘Digital Bible Library’ (Digital Bible Library) is a tool for making translations available online or to mobile users, but your project will not be available to anyone until you agree to make it available.

- Click **Submit Registration**
  - *A message will appear saying ‘Project registered successfully.’*
- Return to Paratext

It should detect that the project is now registered and notify you.

**2.2.3 Migrating a registered project**

If you have just registered your project, your project is already open and you can continue with the migration. Otherwise, open the project to be migrated.

- The migration step has several boxes that you must check to verify that you understand what is involved.
- I am the team member who has been selected to carry out this process for the entire team.
- Our team understands that the PT8 project will be the official copy of the project.
- All team members have stopped editing the PT7 copy of the project.
- All team members have performed a final Send/Receive of their changes in PT7.
- This computer has received the changes in PT7.
- Check these boxes if they are true, then click **Migrate Now** to continue.

If you need to do anything else before you are ready to migrate, click **Migrate later**, then finish your preparations.

- When you click **Migrate Now**, Paratext will copy the project from your Paratext 7 to your Paratext 8 and also perform a send/receive to the Internet.
- If you receive a warning about a final send/receive in **Paratext 7**,
- Click **OK**,
  - *the migration process will stop,*
- mark a milestone in the project history in Paratext 7,
- then restart the migration in Paratext 8.
- Now your colleagues can go to Paratext 9 and do a send/receive to receive the migrated project.

If they do not have an Internet connection, you can send/receive to USB or a network folder, and they can receive the project in Paratext 9 that way.

**2.3 Additional project settings**

- **Language identifier:** After clicking **Migrate now**, Paratext 8 may tell you that you need to specify a language identifier for your project.

You can check the language name and language identifier for your project by going to ≡ Tab, under Project > Project settings > Language settings. The language identifier is either in brackets after the language name or below the name.

- **Books**: The project settings and project properties include a Books tab, where you specify the books you plan to have in your project.

You can choose individual books one at a time, or specify the Old Testament, New Testament, or deuterocanonical books using the buttons. You can change this list of books later in the project if your expectations for the project change.

N.B. After migrating your project, you must also migrate the retranslation and all child translation projects one by one.

**2.4 Migrating a non-shared project**

If a project has not been shared in Paratext 7, you do not need to register it before migrating it, but it is strongly recommended.

- Launch Paratext 8
- **File > Open Project/Resource**
- Click on **Show Paratext 7 projects**
- Select the project you want to migrate.
- Click on **Migrate now** (migrate now)

When you click **Migrate Now**, the project will be migrated to the Paratext 8 folder, ready for use. The registration status will determine which features are available for the project.

N.B. Unshared projects do not need to be registered, but it is recommended.

> 💡 **Tip**
> > ℹ️ **Note**
> > tip
> 
> > ℹ️ **Note**
> > Remember that no one should edit the project in Paratext 7 anymore. This would be a wasted effort, as no one else will ever see their changes. To help your team members remember this, you could delete the project from their Paratext 7 once they have it in Paratext 8. Alternatively, they can uninstall Paratext 7 from their computer if they don't need it for other projects.