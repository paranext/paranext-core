using Paratext.Data;

namespace TestParanextDataProvider
{
    /// <summary>
    /// In-memory stylesheet used for testing
    /// </summary>
    /// <remarks>Shamelessly stolen from Paratext tests and simplified</remarks>
    internal class DummyScrStylesheet : ScrStylesheet
    {
        /// <summary>
        /// Creates a DummyScrStylesheet with basic style definitions.
        /// </summary>
        public DummyScrStylesheet() : base("Dummy Style Sheet")
        {
            AddTag("v", TextProperties.scVerse | TextProperties.scPublishable, ScrTextType.scVerseText,
                   ScrStyleType.scCharacterStyle,
                   "li li1 li2 li3 li4 m mi nb p pc ph phi pi pi1 pi2 pi3 pr pmo pm pmc pmr q q1 q2 q3 q4 qc qr qm qm1 qm2 qm3 qm4 " +
                   "tr tc1 tc2 tc3 tc4 tcr1 tcr2 tcr3 tcr4 s3 d sp");

            AddTag("id", 
                   TextProperties.scParagraph | TextProperties.scNonpublishable | TextProperties.scNonvernacular |
                   TextProperties.scBook,
                   ScrTextType.scOther, ScrStyleType.scParagraphStyle, "");
            AddTag("ip",
                   TextProperties.scParagraph | TextProperties.scPublishable | TextProperties.scVernacular,
                   ScrTextType.scOther, ScrStyleType.scParagraphStyle, "id");
            AddTag("nb",
                   TextProperties.scParagraph | TextProperties.scPublishable | TextProperties.scVernacular,
                   ScrTextType.scVerseText, ScrStyleType.scParagraphStyle, "c");
            AddTag("mt", TextProperties.scParagraph | TextProperties.scPublishable | TextProperties.scVernacular,
                   ScrTextType.scTitle, ScrStyleType.scParagraphStyle, "id");
            AddTag("c", TextProperties.scChapter | TextProperties.scPublishable, ScrTextType.scOther,
                   ScrStyleType.scParagraphStyle, "id");
            AddTag("cp", TextProperties.scParagraph, ScrTextType.scOther, ScrStyleType.scParagraphStyle, "c");
            AddTag("p", TextProperties.scParagraph | TextProperties.scPublishable | TextProperties.scVernacular,
                   ScrTextType.scVerseText, ScrStyleType.scParagraphStyle, "c");
            AddTag("s",
                   TextProperties.scParagraph | TextProperties.scPublishable | TextProperties.scVernacular |
                   TextProperties.scLevel_1,
                   ScrTextType.scSection, ScrStyleType.scParagraphStyle, "c");
            AddTag("rem", TextProperties.scParagraph | TextProperties.scNonpublishable | TextProperties.scNonvernacular,
                   ScrTextType.scOther, ScrStyleType.scParagraphStyle, "id ide c");

            AddTag("w", TextProperties.scParagraph | TextProperties.scPublishable | TextProperties.scVernacular,
                   ScrTextType.scVerseText, ScrStyleType.scCharacterStyle,
                   "ip im li li1 li2 li3 li4 m mi nb p pc ph phi pi pi1 pi2 pi3 pr pmo pm pmc pmr d q q1 q2 q3 q4 " +
                   "qc qr qm qm1 qm2 qm3 tr th1 th2 th3 th4 thr1 thr2 thr3 thr4 tc1 tc2 tc3 tc4 tcr1 tcr2 tcr3 tcr4 " +
                   "s s1 s2 s3 s4 NEST", "w*", "?lemma ?strong ?srcloc");
            AddTag("em", TextProperties.scPublishable | TextProperties.scVernacular,
                   0 /* no specific text type*/, ScrStyleType.scCharacterStyle,
                   "ip im ipi imi ipq imq ipr iq iq1 iq2 iq3 io io1 io2 io3 io4 ms ms1 ms2 s s1 s2 s3 s4 cd sp d " +
                   "li li1 li2 li3 li4 m mi nb p pc ph phi pi pi1 pi2 pi3 pr pmo pm pmc pmr q q1 q2 q3 q4 qc qr " +
                   "qm qm1 qm2 qm3 sp tr th1 th2 th3 th4 thr1 thr2 thr3 thr4 tc1 tc2 tc3 tc4 tcr1 tcr2 tcr3 tcr4 f fe ef NEST",
                   "em*");
            AddTag("nd", TextProperties.scPublishable | TextProperties.scVernacular,
                   ScrTextType.scVerseText, ScrStyleType.scCharacterStyle,
                   "ip im ipi imi ipq imq ipr iq iq1 iq2 iq3 io io1 io2 io3 io4 ms ms1 ms2 s s1 s2 s3 s4 cd sp d li li1 li2 li3 " +
                   "li4 m mi nb p pc ph phi pi pi1 pi2 pi3 pr pmo pm pmc pmr q q1 q2 q3 q4 qc qr qm qm1 qm2 qm3 tr th1 th2 th3 " +
                   "th4 thr1 thr2 thr3 thr4 tc1 tc2 tc3 tc4 tcr1 tcr2 tcr3 tcr4 f fe ef NEST",
                   "nd*");
        }

        /// <summary>
        /// Add a tag for style with the specified properties.
        /// </summary>
        private void AddTag(string marker, TextProperties textProps, ScrTextType textType,
                             ScrStyleType styleType, string occursUnder, string endMarker = "", string? rawAttributes = null)
        {
            ScrTag newTag = new()
            {
                    Marker = marker,
                    TextProperties = textProps,
                    TextType = textType,
                    StyleType = styleType
                };
            if (!string.IsNullOrEmpty(endMarker))
                newTag.Endmarker = endMarker;
            if (!string.IsNullOrEmpty(occursUnder))
                newTag.OccursUnder = occursUnder;
            if (!string.IsNullOrEmpty(rawAttributes))
                newTag.RawAttributes = rawAttributes;
            AddTag(newTag);
        }

        private void AddTag(ScrTag tag)
        {
            AddTagInternal(tag);
            if (!string.IsNullOrEmpty(tag.Endmarker))
                AddTagInternal(new ScrTag(tag.Endmarker) { StyleType = ScrStyleType.scEndStyle });
        }
    }
}
