# HelpData.xml Schema Documentation

## Overview

This directory contains the XML Schema Definition (XSD) for Paratext 9's HelpData.xml file, which stores all context-sensitive help, FAQs, and documentation within the application.

## Files

- **HelpData.xsd** - XML Schema Definition that validates the structure
- **README.md** - This documentation file

## Data Scale

The HelpData.xml file is large:
- **Total Help Items**: 6,565
- **File Size**: ~17 MB
- **Languages Supported**: 8 (de, en, es, fr, pt, pt-BR, ru, zh-Hans)
- **Items with Tags**: 3,949 (60.2%)
- **Items with Keywords**: 5,409 (82.4%)
- **Items with Dialogs**: 2,694 (41.0%)
- **Items with Translation Links**: 6,565 (100%)

## Schema Structure

### Root Element: `<ArrayOfHelpDataItem>`

The root element contains a collection of `HelpDataItem` elements.

### HelpDataItem Element

Each help topic consists of the following elements:

#### Required Elements

1. **Question** (string)
   - The question or topic title that users search for
   - Example: "How do I mark progress on tasks or checks assigned to me?"

2. **Answer** (string)
   - Detailed explanation with rich formatting
   - Supports special markup syntax (see below)

3. **Type** (string)
   - Classification of the help item
   - Common values: "help", "faq"

#### Optional Elements

4. **Tags** (string, optional)
   - Space-separated categorization tags
   - Example: "DC faq"
   - Common tags:
     - `DC` - Document-Centric features
     - `faq` - Frequently Asked Question

5. **Keywords** (string, optional)
   - Space-separated search keywords
   - Used for indexing and discoverability
   - Often includes component names and menu paths
   - Example: "ComponentResources ComponentEnhancedResources Full-Menus"

6. **AltSearchTerms** (string, optional)
   - Alternative search terms for improved findability
   - Provides synonyms and related terminology

7. **Dialogs** (string, optional)
   - Space-separated list of associated dialog/form names
   - Links help to specific UI components
   - Example: "LocationFilterForm WordListForm"

#### Attributes

1. **id** (required)
   - Unique identifier (GUID format)
   - Example: "4dd7cba4-bdaa-4576-917d-f9270c7463d1"
   - Used for internal linking and cross-references

2. **translationLink** (optional)
   - Reference to translation management system
   - Tracks translations across language versions
   - Example: "3a1829136a4d"

3. **language** (required)
   - ISO 639 language code with optional region
   - Supported values: en, es, fr, de, pt, pt-BR, ru, zh-Hans

4. **component** (optional)
   - Associated feature/component identifier
   - Used for organizational purposes

## Example HelpDataItem

```xml
<HelpDataItem id="4dd7cba4-bdaa-4576-917d-f9270c7463d1"
              translationLink="3a1829136a4d"
              language="en">
  <Question>How do I mark progress on tasks or checks assigned to me?</Question>
  <Answer>Open a project where tasks or checks are assigned to you...

    {link:25b0b0132464}
    {tip:hover over:hold the mouse pointer over}
    {section: What happens when you select Scripture other than the default}
    ...content...
    {section}
  </Answer>
  <Type>help</Type>
  <Tags>DC</Tags>
  <Keywords>Full-Menus ComponentAssignmentsAndProgress dropdown</Keywords>
  <Dialogs>LocationFilterForm</Dialogs>
</HelpDataItem>
```

## Markup Syntax in Answers

The Answer field supports a rich markup syntax for enhanced presentation:

### Links
- `{link:id}` - Cross-reference to another help item by translationLink ID
- Example: `{link:25b0b0132464}` links to help item with that translationLink

### Tooltips
- `{tip:display_text:tooltip_text}` - Shows display text with tooltip on hover
- Example: `{tip:hover over:hold the mouse pointer over}`

### Images
- `{image:filename:width:size}` - Embeds an image
- Example: `{image:menu_icon.png:width:16px}`

### Collapsible Sections
- `{section:title}...{section}` - Creates expandable/collapsible content
- Example:
  ```
  {section: What happens when you select Scripture other than the default}
  ...detailed content...
  {section}
  ```

### Guide Steps
- `{guidestep:N:elementName}` - References a UI element in a numbered step
- The elementName often maps to control IDs in source code

### Text Formatting
- `*text*` - Bold
- `_text_` - Italic
- `#` - Numbered list item
- `**` - Sub-item in list
- `\\` - Line break

### Special Symbols
- `(/)` - Checkmark/tip indicator
- `(!)` - Warning indicator
- `(i)` - Information indicator

## Data Insights

### Language Distribution
The help system is highly internationalized with content in 8 languages, allowing Paratext to serve a global user base.

### Content Organization
- **High Keyword Coverage** (82.4%) - Most items are well-indexed for search
- **Moderate Dialog Linking** (41.0%) - Many topics linked to specific UI components
- **Strong Categorization** (60.2%) - Over half the items have category tags

### Translation Infrastructure
- All items have translation links, indicating robust translation management
- Consistent structure across all language versions
