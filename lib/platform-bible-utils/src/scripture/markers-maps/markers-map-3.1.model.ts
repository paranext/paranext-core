/**
 * Information about a USFM marker that is just an attribute in USX/USJ. See {@link MarkerInfo} for
 * other kinds of markers.
 *
 * An attribute marker is a marker that adds information to a previous marker in USFM and is an
 * attribute on that previous marker instead in USX/USJ.
 *
 * For example, `ca` and `cp` are attribute markers for `c`. `va` and `vp` are attribute markers for
 * `v`. `cat` is an attribute marker for `f`, `esb`, and more.
 *
 * Following is an example of using the `ca` and `cp` attribute markers in USFM:
 *
 * ```usfm
 * \c 1 \ca 2\ca*
 * \cp A
 * \s1 This is a section header
 * ```
 *
 * The equivalent in USX would be:
 *
 * ```xml
 * <!-- prettier-ignore -->
 * <chapter number="1" style="c" altnumber="2" pubnumber="A" sid="GEN 1" />
 * <para style="s1">This is a section header</para>
 * ```
 */
export type AttributeMarkerInfo = NormalMarkerInfo & {
  /**
   * List of normal marker names for which this marker is an attribute marker.
   *
   * For example, `ca` and `cp` are attribute markers for `c`. `isAttributeMarkerFor` would be
   * `['c']` for both `ca` and `cp`.
   */
  isAttributeMarkerFor?: string[];
  /**
   * List of RegExp patterns matching marker names for which this marker is an attribute marker.
   *
   * For example, pretend `ex1` and `ex2` are attribute markers for markers matching RegExp
   * `/test/`. `isAttributeMarkerForRegExp` would be `['test']` for both `ex1` and `ex2`.
   */
  isAttributeMarkerForRegExp?: string[];
  /**
   * The name of the USX/USJ attribute this attribute marker represents.
   *
   * For example, `ca` is an attribute marker for `c` and represents the `altnumber` attribute on
   * the `c` marker in USX/USJ. `attributeMarkerAttributeName` would be `altnumber` for the `ca`
   * marker.
   */
  attributeMarkerAttributeName: string;
  /**
   * Whether there should be a structural space after the closing marker in output USFM if this
   * marker is an attribute marker. If this marker is not an attribute marker, it should not have a
   * structural space after the closing marker.
   *
   * This field should be ignored if {@link MarkersMap.isSpaceAfterAttributeMarkersContent} is `true`
   * because this space is only supposed to be added in contexts in which the space here is
   * structural. Otherwise we would be mistakenly adding content to the USFM.
   *
   * Note that, if {@link MarkersMap.isSpaceAfterAttributeMarkersContent} is `true` (which is the
   * case according to spec), horizontal spaces after attribute markers are always considered
   * structural. This property only indicates whether there should be a space after the attribute
   * marker when outputting USFM.
   *
   * For example, according to specification, the `va` and `vp` attribute markers have a space after
   * their closing markers:
   *
   * ```usfm
   * \p \v 10 \va 10 va\va* \vp 10 vp\vp* Some verse text
   * ```
   *
   * The verse text in this example is just "Some verse text" without a space at the start.
   *
   * However, when the `vp` marker is not an attribute marker, such as when it has markers in its
   * contents, there should not be a structural space after the closing marker, and any space should
   * be considered content:
   *
   * ```usfm
   * \p \v 10 \va 10 va\va* \vp \+wj 10 vp\+wj*\vp* Some verse text.
   * ```
   *
   * The verse text in this example is " Some verse text" including a space at the start.
   *
   * The `cat` attribute marker does not have a structural space after its closing marker:
   *
   * ```usfm
   * \f + \cat category here\cat*\fr 1:2 \ft Some footnote text\f*
   * ```
   *
   * The verse text in this example is just "Some verse text" without a space at the start.
   *
   * If not present, defaults to `false`.
   */
  hasStructuralSpaceAfterCloseAttributeMarker?: boolean;
};

/**
 * Information about a regular USFM/USX/USJ marker. See {@link MarkerInfo} for other kinds of
 * markers.
 */
export type NormalMarkerInfo = {
  /**
   * Which marker type the marker is. Determines how the marker is structured in the data such as
   * what kind of mandatory whitespace is around the marker in USFM. See {@link MarkerTypeInfoBase}
   * for information.
   */
  type: string;
  /** Explanation of the meaning of this marker */
  description?: string;
  /**
   * Which attribute can be provided without specifying the attribute name in USFM.
   *
   * A marker can have a default attribute only if it has zero or one non-optional attributes.
   *
   * An attribute can be provided with default syntax in the USFM only if it is the only attribute
   * provided for the marker.
   *
   * Following is an example of a marker with a default attribute:
   *
   * ```usfm
   * \w stuff|thisIsTheLemmaDefaultAttribute\w*
   * ```
   *
   * Following is an example of a marker with multiple attributes (cannot use default attribute
   * syntax):
   *
   * ```usfm
   * \w stuff|lemma="thisIsTheLemma" strong="H1234,G1234"\w*
   * ```
   */
  defaultAttribute?: string;
  /**
   * The name of the text content attribute that is present on this marker if this marker has text
   * content in USFM.
   *
   * Text content attributes are attributes in USX/USJ that are represented in USFM as the actual
   * text content of the marker.
   *
   * For example, `alt` is a text content attribute on the `periph` marker. This value would be
   * `alt` for the `periph` marker.
   *
   * Following is an example of a `periph` marker in USFM:
   *
   * ```usfm
   * \periph Example Peripheral|id="x-example"
   * \p Some contents of the example peripheral
   * ```
   *
   * The equivalent in USX would be:
   *
   * ```xml
   * <!-- prettier-ignore -->
   * <periph alt="Example Peripheral" id="x-example">
   *   <para style="p">Some contents of the example peripheral</para>
   * </periph>
   * ```
   */
  textContentAttribute?: string;
  /**
   * List of leading attributes that must be present on this marker. This list is ordered by the
   * order in which the attributes should appear.
   *
   * Leading attributes are attributes in USJ/USX that are listed in USFM directly after the marker
   * and separated only by a space.
   *
   * For example, `code` is a leading attribute on the `id` marker. This value would be `['code']`
   * for the `id` marker.
   *
   * Following is an example of an `id` marker in USFM:
   *
   * ```usfm
   * \id MAT 41MATEX.SFM, Example Translation, September 2025
   * ```
   *
   * The equivalent in USX would be:
   *
   * ```xml
   * <!-- prettier-ignore -->
   * <book code="MAT" style="id">41MATEX.SFM, Example Translation, September 2025</book>
   * ```
   */
  leadingAttributes?: string[];
  /**
   * List of attribute markers that may be present on this marker. This list is ordered by the order
   * in which the markers should appear.
   *
   * An attribute marker is a marker that adds information to a previous marker in USFM and is an
   * attribute on that previous marker in USX/USJ.
   *
   * For example, `ca` and `cp` are attribute markers for `c`. This value would be `['ca', 'cp']`
   * for `c`.
   *
   * Note: the attribute names for attribute markers may be different than the marker names. See
   * {@link AttributeMarkerInfo.attributeMarkerAttributeName} for more information.
   */
  attributeMarkers?: string[];
  /**
   * Whether the closing marker for this marker is considered optional in USFM. This should always
   * be not present or `false` if there is no closing marker for the marker type of this marker.
   *
   * If this is `false` and a closing marker for this marker in USFM is _not_ present, the USX/USJ
   * for this marker should have the attribute `closed` set to `false`.
   *
   * If this is `true`, the `closed` attribute should be present if the presence of a closing marker
   * for this marker in USFM does not match the assumption implied by
   * {@link MarkersMap.shouldOptionalClosingMarkersBePresent}.
   *
   * If not present, defaults to `false`
   */
  isClosingMarkerOptional?: boolean;
  /**
   * List of independent closing marker names for this marker in USFM if it has any. If this is
   * defined, this marker does not have a normal closing marker but rather is closed by a completely
   * separate marker in USFM. All contents between this marker and the independent closing marker
   * are contents of this marker. In USX and USJ, this marker is closed normally like any other
   * object because USX and USJ have clear hierarchical structure.
   *
   * For example, `esb` (a sidebar) is closed by the independent closing marker `esbe`.
   * `independentClosingMarkers` would be `['esbe']` for `esb`. Following is an example of a
   * sidebar:
   *
   * ```usfm
   * \esb
   * \p This paragraph is in a \bd sidebar\bd*.
   * \p The sidebar can contain multiple paragraphs.
   * \esbe
   * ```
   *
   * Note that the independent closing marker does not have a `*` at the end because it is not a
   * closing marker for `esb` but rather a completely separate marker that closes the `esb` marker.
   *
   * When outputting to USFM, the first independent closing marker listed in this array should be
   * used.
   */
  independentClosingMarkers?: string[];
  /**
   * List of marker names for which this marker is an independent closing marker. See
   * {@link NormalMarkerInfo.independentClosingMarker} for more information on independent closing
   * markers and their syntax.
   *
   * For example, `esbe` is an independent closing marker for `esb`. `isIndependentClosingMarkerFor`
   * would be `['esb']` for `esbe`.
   */
  isIndependentClosingMarkerFor?: string[];
  /**
   * List of RegExp patterns matching marker names for which this marker is an independent closing
   * marker. See {@link NormalMarkerInfo.independentClosingMarker} for more information on
   * independent closing markers and their syntax.
   *
   * For example, pretend `ex1` and `ex2` are independent closing markers for markers matching
   * RegExp `/test/`. `isIndependentClosingMarkerForRegExp` would be `['test']` for both `ex1` and
   * `ex2`.
   */
  isIndependentClosingMarkerForRegExp?: string[];
  /**
   * Marker to use when operating on the USFM representation of this marker. For example, when
   * outputting to USFM, the marker info for the marker listed here in `markerUsfm` should be used
   * instead of the marker info for the marker as listed in USX or USJ.
   */
  markerUsfm?: string;
  /**
   * Instructions regarding special handling required for this marker when transforming from USFM to
   * USX or USJ. These instructions are an explanation of what needs to be done to this marker to
   * properly transform it to USX or USJ.
   *
   * This property is generally only included when it is exceptionally difficult to parse a marker
   * properly from USFM; the markers map attempts to use this property as little as possible,
   * favoring encoding information in other properties for more automatic transformation instead.
   */
  parseUsfmInstructions?: string;
};

/** Information about a USFM/USX/USJ marker that is essential for proper translation between formats */
export type MarkerInfo = NormalMarkerInfo | AttributeMarkerInfo;

/**
 * Information about a USFM/USX/USJ marker type that does not have a closing marker. See
 * {@link MarkerInfo} for other kinds of marker types.
 *
 * For example, `char` marker types such as `nd` markers have closing markers, but `para` markers
 * such as `p` do not:
 *
 * ```usfm
 * \p This is a plain paragraph.
 * \p This is a paragraph \nd with some special text\nd* in it.
 * ```
 *
 * If the marker type has a closing marker but the closing marker is not present in the USFM for a
 * marker with this marker type, the USX/USJ for the marker will have the attribute `closed` set to
 * `false` unless {@link CloseableMarkerTypeInfo.isClosingMarkerOptional} is `true`.
 */
export type CloseableMarkerTypeInfo = MarkerTypeInfoBase & {
  /**
   * Whether markers of this type have a closing marker in USFM. This property concerns normal
   * closing markers like `\wj*`, not independent closing markers like
   * {@link NormalMarkerInfo.independentClosingMarkers}, which are completely separate markers.
   *
   * If not present, defaults to `false`
   */
  hasClosingMarker: true;
  /**
   * Whether the closing marker for markers of this type is "empty" in USFM, meaning the marker name
   * is absent from the closing marker. This also means that there should not be a structural space
   * between the opening and the closing markers in USFM if there are no attributes listed on the
   * marker.
   *
   * For example, markers of type `ms` (such as `qt1-s` and `qt1-e`) have an empty closing marker:
   *
   * ```usfm
   * \qt1-s\*
   * ...
   * \qt1-e\*
   * ```
   *
   * The closing marker for `qt1-s` is `\*` as opposed to the closing marker for `nd` which is
   * `\nd*`.
   *
   * Note that there is still a structural space after the opening marker if there are attributes
   * present:
   *
   * ```usfm
   * \qt1-s |Someone\*
   * ...
   * \qt1-e\*
   * ```
   *
   * If not present, defaults to `false`
   */
  isClosingMarkerEmpty?: boolean;
};

/**
 * Information about a USFM/USX/USJ marker type that does not have a closing marker. See
 * {@link MarkerInfo} for other kinds of marker types.
 *
 * For example, `char` marker types such as `nd` markers have closing markers, but `para` marker
 * types such as `p` do not:
 *
 * ```usfm
 * \p This is a plain paragraph.
 * \p This is a paragraph \nd with some special text\nd* in it.
 * ```
 *
 * If the marker type has a closing marker but the closing marker is not present in the USFM for a
 * marker with this marker type, the USX/USJ for the marker will have the attribute `closed` set to
 * `false` unless {@link CloseableMarkerTypeInfo.isClosingMarkerOptional} is `true`.
 */
export type NonCloseableMarkerTypeInfo = MarkerTypeInfoBase & {
  /**
   * Whether markers of this type need a closing marker in USFM.
   *
   * If not present, defaults to `false`
   */
  hasClosingMarker?: false;
};

/**
 * Information about a USFM/USX/USJ marker type that is common to all marker types. See
 * {@link MarkerTypeInfo} for various kinds of marker types.
 */
export type MarkerTypeInfoBase = {
  /** Explanation of the meaning of this marker type */
  description?: string;
  /**
   * Whether markers of this type should have a `style` attribute in USX/USJ.
   *
   * If this is `false`, it also means the marker type is the same as the marker name.
   *
   * If not present, defaults to `true`.
   */
  hasStyleAttribute?: boolean;
  /**
   * List of attributes that should not be output to USFM on markers of this type.
   *
   * This is used for attributes that are not present in USFM. For example, the `sid` attribute on
   * the `verse` type marker is not present in USFM because it is derived metadata in USX/USJ and is
   * not present in USFM.
   *
   * This property is not used when converting to USX or USJ.
   */
  skipOutputAttributeToUsfm?: string[];
  /**
   * List of attributes indicating whether to skip outputting this marker to USFM. If any of the
   * listed attributes is present on the marker, skip outputting this marker when converting to
   * USFM. Only skip outputting the opening and closing marker representations, though; the content
   * inside the marker (if present) should not be skipped.
   *
   * This is used for certain markers that sometimes are normal markers but sometimes are derived
   * metadata and are not present in USFM. These derived metadata markers are identified by whether
   * they have specific attributes on them.
   *
   * For example, if the `verse` marker has an `eid` attribute, it indicates it is a marker denoting
   * the end of the verse that is derived metadata in USX/USJ and is not present in USFM. Note that
   * the `verse` marker does not have the `style="v"` attribute in this situation, so this list of
   * attributes is on the marker type.
   *
   * Following is an example of a derived metadata `verse` marker in USX:
   *
   * ```xml
   * <!-- prettier-ignore -->
   * <para style="p">
   *   <verse number="21" style="v" sid="2SA 1:21" />This is verse 21.<verse eid="2SA 1:21" />
   * </para>
   * ```
   *
   * The equivalent in USFM would be:
   *
   * ```usfm
   * \p
   * \v 21 This is verse 21.
   * ```
   *
   * An example with content inside the marker that should not be skipped is generated `ref`s. These
   * `ref`s wrap project-localized Scripture references in `xt` markers and have computer-readable
   * Scripture References as their `loc` attribute. These `ref`s that are derived metadata have the
   * `gen` attribute set to `"true"` and can be removed if `gen="true"` is present.
   *
   * Following is an example of a generated `ref` in USX:
   *
   * ```xml
   * <!-- prettier-ignore -->
   * <char style="xt"><ref loc="2SA 1:1" gen="true">2Sam 1:1</ref>; <ref loc="2SA 1:2-3">2Sam 1:2-3</ref>.</char>
   * ```
   *
   * The equivalent in USFM would be:
   *
   * ```usfm
   * \xt 2Sam 1:1; 2Sam 1:2-3.\xt*
   * ```
   *
   * This property is not used when converting to USX or USJ.
   */
  skipOutputMarkerToUsfmIfAttributeIsPresent?: string[];
  /**
   * Whether to always skip outputting this marker to USFM. Skip outputting this marker when
   * converting to USFM. Only skip outputting the opening and closing marker representations,
   * though; the content inside the marker (if present) should not be skipped.
   *
   * This is used for marker types that have no representation in USFM in a given version, likely
   * meaning they are derived metadata and are not present in USFM.
   *
   * For example, in USFM 3.1, the `table` marker type is generated while transforming USFM into
   * USX/USJ and is not preserved when transforming from USX/USJ to USFM.
   *
   * Following is an example of a derived metadata `table` marker in USX:
   *
   * ```xml
   * <!-- prettier-ignore -->
   * <table>
   *   <row style="tr">
   *     <cell style="th1" align="start">Header 1</cell>
   *     <cell style="th2" align="start">Header 2 space after </cell>
   *     <cell style="thc3" align="center" colspan="2">Header 3-4 centered</cell>
   *     <cell style="thr5" align="end">Header 5 right</cell>
   *   </row>
   *   <row style="tr">
   *     <cell style="tc1" align="start">Row 1 cell 1</cell>
   *     <cell style="tc2" align="start">Row 1 cell 2 space after </cell>
   *     <cell style="thc3" align="center">Row 1 cell 3 centered</cell>
   *     <cell style="thr4" align="end" colspan="2">Row 1 cell 4-5 right</cell>
   *   </row>
   *   <row style="tr">
   *     <cell style="tcr1" align="end" colspan="4">Row 2 cell 1-4 right</cell>
   *     <cell style="tc5" align="start">Row 2 cell 5</cell>
   *   </row>
   * </table>
   * ```
   *
   * The equivalent in USFM would be:
   *
   * ```usfm
   * \tr \th1 Header 1\th2 Header 2 space after \thc3-4 Header 3-4 centered\thr5 Header 5 right
   * \tr \tc1 Row 1 cell 1\tc2 Row 1 cell 2 space after \thc3 Row 1 cell 3 centered\thr4-5 Row 1 cell 4-5 right
   * \tr \tcr1-4 Row 2 cell 1-4 right\tc5 Row 2 cell 5
   * ```
   *
   * This property is not used when converting to USX or USJ.
   *
   * If not present, defaults to `false`
   */
  skipOutputMarkerToUsfm?: boolean;
  /**
   * Whether markers of this type should have a newline before them in USFM.
   *
   * For example, `para` marker types such as `p` should have a newline, but `char` marker types
   * such as `nd` markers should not:
   *
   * ```usfm
   * \p This is a plain paragraph.
   * \p This is a paragraph \nd with some special text\nd* in it.
   * ```
   *
   * Note that the newline is never strictly necessary, and it is not usually present if the very
   * first marker in the file (or in examples such as this) should have a newline.
   *
   * If not present, defaults to `false`
   */
  hasNewlineBefore?: boolean;
  /**
   * Marker type to use when operating on the USFM representation of markers of this type. For
   * example, when outputting to USFM, the marker type listed here in `markerTypeUsfm` should be
   * used instead of the marker's type as listed in USX or USJ.
   */
  markerTypeUsfm?: string;
  /**
   * Marker type to use when operating on the USX representation of markers of this type. For
   * example, when outputting to USX, the marker type listed here in `markerTypeUsx` should be used
   * instead of the marker's type as listed in USFM or USJ.
   */
  markerTypeUsx?: string;
  /**
   * Marker type to use when operating on the USJ representation of markers of this type. For
   * example, when outputting to USJ, the marker type listed here in `markerTypeUsj` should be used
   * instead of the marker's type as listed in USFM or USX.
   */
  markerTypeUsj?: string;
  /**
   * Prefix to add to the opening and closing marker before the marker name if a marker of this type
   * occurs within another marker of this type when outputting to USFM.
   *
   * Following is an example of `nd` inside `wj` (both are `char`-type markers) in USFM:
   *
   * ```usfm
   * \p \wj This is \+nd nested\+nd*!\wj*
   * ```
   */
  nestedPrefix?: string;
  /**
   * Instructions regarding special handling required for this marker type when transforming to
   * USFM. These instructions are an explanation of what needs to be done to markers of this type to
   * properly transform the marker to USFM.
   *
   * This property is generally only included when it is exceptionally difficult to output a marker
   * properly to USFM; the markers map attempts to use this property as little as possible, favoring
   * encoding information in other properties for more automatic transformation instead.
   */
  outputToUsfmInstructions?: string;
  /**
   * Instructions regarding special handling required for this marker type when transforming from
   * USFM to USX or USJ. These instructions are an explanation of what needs to be done to markers
   * of this type to properly transform the marker to USX or USJ.
   *
   * This property is generally only included when it is exceptionally difficult to parse a marker
   * properly from USFM; the markers map attempts to use this property as little as possible,
   * favoring encoding information in other properties for more automatic transformation instead.
   */
  parseUsfmInstructions?: string;
};

/**
 * Information about a USFM/USX/USJ marker type that is essential for proper translation between
 * formats
 */
export type MarkerTypeInfo = CloseableMarkerTypeInfo | NonCloseableMarkerTypeInfo;

/** A map of all USFM/USX/USJ markers and some information about them */
export type MarkersMap = {
  /** Which version of USFM/USX/USJ this map represents */
  version: string;
  /**
   * Which commit this map came from. This is necessary because the schema file seems to be
   * distributed multiple times in one release version. As such, this specifies the exact version of
   * the schema file.
   */
  commit: string;
  /**
   * Which version of the markers map types this markers map conforms to. Follows [Semantic
   * versioning](https://semver.org/); the same major version contains no breaking changes.
   */
  markersMapVersion: `1.${number}.${number}${string}`;
  /**
   * Which tag or commit of `usfm-tools` repo this map is generated from.
   *
   * Contains the output from `git tag --points-at HEAD` or `git rev-parse HEAD`
   *
   * Will also have a `+` at the end if there were working changes outside the `src/test-data`
   * folder when this was generated.
   */
  usfmToolsVersion: string;
  /**
   * Whether any whitespace after attribute markers and before the next content is not just
   * structural but should actually be considered part of the content of the marker.
   *
   * According to specification, whitespace after attribute markers is not content but is just
   * structural.
   *
   * According to Paratext 9.4, whitespace after attribute markers is content and is not just
   * structural.
   *
   * This setting determines which interpretation to use when converting from USFM to USX/USJ.
   *
   * If not present, defaults to `false`.
   */
  isSpaceAfterAttributeMarkersContent?: boolean;
  /**
   * Whether markers with optional closing markers (see
   * {@link NormalMarkerInfo.isClosingMarkerOptional}) should still be explicitly closed in USFM.
   * That is, whether markers with optional closing markers still need the `closed` attribute set to
   * `"false"` in USX/USJ if the closing marker is not present in USFM.
   *
   * In other words, this setting determines whether markers with optional closing markers should be
   * assumed to be explicitly closed (meaning the closing marker is present in USFM) when
   * transforming USX/USJ to USFM unless otherwise indicated by the `closed` attribute.
   *
   * If this is `true` (matches Paratext 9.4), markers with optional closing markers are treated
   * like other markers in that they are assumed to be explicitly closed in USFM unless otherwise
   * indicated:
   *
   * - If they are not explicitly closed in USFM, they should have `closed="false"`
   * - If they are explicitly closed in USFM, they do not need `closed="true"`
   *
   * If this is `false` (matches specification), markers with optional closing markers are assumed
   * not to be explicitly closed in USFM unless otherwise indicated:
   *
   * - If they are not explicitly closed in USFM, they do not need `closed="false"`
   * - If they are explicitly closed in USFM, they should have `closed="true"`
   *
   *   - Disclaimer: It is not clear that `closed="true"` should be present in this case according to
   *       `usx.rng`; it seems `usx.rng` indicates that optional closing markers should never be
   *       output to USFM. It is possible that `usx.rng` considers this to be a case where
   *       preserving the exact USFM is not important.
   *
   * If not present, defaults to `false`.
   */
  shouldOptionalClosingMarkersBePresent?: boolean;
  /**
   * Map whose keys are the marker names and whose values are information about that marker
   *
   * If you find the marker name in this map, you do not need to search the `markersRegExp` map.
   */
  markers: Record<string, MarkerInfo | undefined>;
  /**
   * Map whose keys are string representations of `RegExp` patterns to match against marker names
   * (using the
   * [test](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * function) and whose values are information about that marker
   *
   * You do not need to search this map if you found the marker name in the `markers` map.
   */
  markersRegExp: Record<string, MarkerInfo | undefined>;
  /** Map whose keys are the marker types and whose values are information about that marker type */
  markerTypes: Record<string, MarkerTypeInfo | undefined>;
};

// This function should safely freeze anything, but TypeScript doesn't understand.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepFreeze(o: any) {
  Object.freeze(o);
  // Don't want to crash out on null
  // eslint-disable-next-line no-null/no-null
  if (o === undefined || o === null) {
    return o;
  }

  Object.getOwnPropertyNames(o).forEach(function freezeProperty(prop) {
    if (
      // Need to make sure to avoid null, which is an object type
      // eslint-disable-next-line no-null/no-null
      o[prop] !== null &&
      (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });

  return o;
}

/**
 * A map of all USFM/USX/USJ markers and some information about them. Generated from a `usx.rng`
 * file
 */
export const USFM_MARKERS_MAP: MarkersMap = deepFreeze({
  version: '3.1',
  commit: '50f2a6ac3fc1d867d906df28bc00fcff729a7b76',
  markersMapVersion: '1.0.0',
  usfmToolsVersion: '39dc10f26a33da0de4eb5b269f5bba1f2fd35c48',
  markers: {
    add: {
      type: 'char',
      description: 'For a translational addition to the text',
    },
    addpn: {
      type: 'char',
      description:
        'For chinese words to be dot underline & underline (DEPRECATED - used nested char@style pn)',
    },
    b: {
      type: 'para',
      description: 'Poetry text stanza break (e.g. stanza break)',
    },
    bd: {
      type: 'char',
      description: 'A character style, use bold text',
    },
    bdit: {
      type: 'char',
      description: 'A character style, use bold + italic text',
    },
    bk: {
      type: 'char',
      description: 'For the quoted name of a book',
    },
    c: {
      type: 'chapter',
      leadingAttributes: ['number'],
      attributeMarkers: ['ca', 'cp'],
    },
    ca: {
      type: 'char',
      attributeMarkerAttributeName: 'altnumber',
      isAttributeMarkerFor: ['c'],
      hasStructuralSpaceAfterCloseAttributeMarker: true,
    },
    cat: {
      type: 'char',
      attributeMarkerAttributeName: 'category',
      isAttributeMarkerFor: ['ef', 'efe', 'esb', 'ex', 'f', 'fe', 'x'],
    },
    cd: {
      type: 'para',
      description: 'Chapter Description (Publishing option D, e.g. in Russian Bibles)',
    },
    cl: {
      type: 'para',
      description: 'Chapter label used for translations that add a word such as "Chapter"',
    },
    cls: {
      type: 'para',
      description: 'Closure of an Epistle',
    },
    cp: {
      type: 'para',
      description: 'Chapter published style',
      attributeMarkerAttributeName: 'pubnumber',
      isAttributeMarkerFor: ['c'],
    },
    d: {
      type: 'para',
      description: 'A Hebrew text heading, to provide description (e.g. Psalms)',
    },
    dc: {
      type: 'char',
      description: 'Deuterocanonical/LXX additions or insertions in the Protocanonical text',
    },
    ef: {
      type: 'note',
      description: 'Study note',
      leadingAttributes: ['caller'],
      attributeMarkers: ['cat'],
    },
    efe: {
      type: 'note',
      description: 'Extended study endnote',
      leadingAttributes: ['caller'],
      attributeMarkers: ['cat'],
    },
    efm: {
      type: 'char',
      description: 'Reference to caller of previous footnote in a study Bible',
    },
    em: {
      type: 'char',
      description: 'A character style, use emphasized text style',
    },
    esb: {
      type: 'sidebar',
      independentClosingMarkers: ['esbe'],
      attributeMarkers: ['cat'],
    },
    esbe: {
      type: 'sidebar',
      isIndependentClosingMarkerFor: ['esb'],
    },
    ex: {
      type: 'note',
      description: 'Extended cross reference',
      leadingAttributes: ['caller'],
      attributeMarkers: ['cat'],
    },
    f: {
      type: 'note',
      description: 'Footnote',
      leadingAttributes: ['caller'],
      attributeMarkers: ['cat'],
    },
    fdc: {
      type: 'char',
      description: 'Footnote text, applies to Deuterocanon only (DEPRECATED - use char@style dc)',
      isClosingMarkerOptional: true,
    },
    fe: {
      type: 'note',
      description: 'Endnote',
      leadingAttributes: ['caller'],
      attributeMarkers: ['cat'],
    },
    fig: {
      type: 'figure',
    },
    fk: {
      type: 'char',
      description: 'A footnote keyword',
      isClosingMarkerOptional: true,
    },
    fl: {
      type: 'char',
      description:
        'A footnote label text item, for marking or "labelling" the type or alternate translation being provided in the note.',
      isClosingMarkerOptional: true,
    },
    fm: {
      type: 'char',
      description: 'Reference to caller of previous footnote',
    },
    fp: {
      type: 'char',
      description: 'A Footnote additional paragraph marker',
      isClosingMarkerOptional: true,
    },
    fq: {
      type: 'char',
      description: 'A footnote scripture quote or alternate rendering',
      isClosingMarkerOptional: true,
    },
    fqa: {
      type: 'char',
      description: 'A footnote alternate rendering for a portion of scripture text',
      isClosingMarkerOptional: true,
    },
    fr: {
      type: 'char',
      description: 'The origin reference for the footnote',
      isClosingMarkerOptional: true,
    },
    ft: {
      type: 'char',
      description: 'Footnote text, Protocanon',
      isClosingMarkerOptional: true,
    },
    fv: {
      type: 'char',
      description: 'A verse number within the footnote text',
    },
    fw: {
      type: 'char',
      description:
        'A footnote witness list, for distinguishing a list of sigla representing witnesses in critical editions.',
      isClosingMarkerOptional: true,
    },
    h: {
      type: 'para',
      description: 'Running header text for a book',
    },
    h1: {
      type: 'para',
      description: 'Running header text',
    },
    h2: {
      type: 'para',
      description: 'Running header text, left side of page (DEPRECATED)',
    },
    h3: {
      type: 'para',
      description: 'Running header text, right side of page (DEPRECATED)',
    },
    ib: {
      type: 'para',
      description: 'Introduction blank line',
    },
    id: {
      type: 'book',
      leadingAttributes: ['code'],
    },
    ide: {
      type: 'para',
      description: 'File encoding information (DEPRECATED)',
    },
    ie: {
      type: 'para',
      description: 'Introduction ending marker',
    },
    iex: {
      type: 'para',
      description:
        'Introduction explanatory or bridge text (e.g. explanation of missing book in Short Old Testament)',
    },
    ili: {
      type: 'para',
      description: 'A list entry, level 1 (if single level)',
    },
    ili1: {
      type: 'para',
      description: 'A list entry, level 1 (if multiple levels)',
    },
    ili2: {
      type: 'para',
      description: 'A list entry, level 2',
    },
    im: {
      type: 'para',
      description:
        'Introduction prose paragraph, with no first line indent (may occur after poetry)',
    },
    imi: {
      type: 'para',
      description: 'Introduction prose paragraph text, indented, with no first line indent',
    },
    imq: {
      type: 'para',
      description:
        'Introduction prose paragraph, quote from the body text, with no first line indent',
    },
    imt: {
      type: 'para',
      description: 'Introduction major title, level 1 - (if single level)',
    },
    imt1: {
      type: 'para',
      description: 'Introduction major title, level 1 (if multiple levels)',
    },
    imt2: {
      type: 'para',
      description: 'Introduction major title, level 2',
    },
    imt3: {
      type: 'para',
      description: 'Introduction major title, level 3',
    },
    imt4: {
      type: 'para',
      description: 'Introduction major title, level 4 (usually within parenthesis)',
    },
    imte: {
      type: 'para',
      description: 'Introduction major title at introduction end, level 1 (if single level)',
    },
    imte1: {
      type: 'para',
      description: 'Introduction major title at introduction end, level 1 (if multiple levels)',
    },
    imte2: {
      type: 'para',
      description: 'Introduction major title at introduction end, level 2',
    },
    io: {
      type: 'para',
      description: 'Introduction outline text, level 1 (if single level)',
    },
    io1: {
      type: 'para',
      description: 'Introduction outline text, level 1 (if multiple levels)',
    },
    io2: {
      type: 'para',
      description: 'Introduction outline text, level 2',
    },
    io3: {
      type: 'para',
      description: 'Introduction outline text, level 3',
    },
    io4: {
      type: 'para',
      description: 'Introduction outline text, level 4',
    },
    ior: {
      type: 'char',
    },
    iot: {
      type: 'para',
      description: 'Introduction outline title',
    },
    ip: {
      type: 'para',
      description:
        'Introduction prose paragraph\nDivision or Section introductory paragraph (study Bible)',
    },
    ipi: {
      type: 'para',
      description: 'Introduction prose paragraph, indented, with first line indent',
    },
    ipq: {
      type: 'para',
      description: 'Introduction prose paragraph, quote from the body text',
    },
    ipr: {
      type: 'para',
      description: 'Introduction prose paragraph, right aligned',
    },
    iq: {
      type: 'para',
      description: 'Introduction poetry text, level 1 (if single level)',
    },
    iq1: {
      type: 'para',
      description: 'Introduction poetry text, level 1 (if multiple levels)',
    },
    iq2: {
      type: 'para',
      description: 'Introduction poetry text, level 2',
    },
    iq3: {
      type: 'para',
      description: 'Introduction poetry text, level 3',
    },
    iqt: {
      type: 'char',
    },
    is: {
      type: 'para',
      description: 'Introduction section heading, level 1 (if single level)',
    },
    is1: {
      type: 'para',
      description: 'Introduction section heading, level 1 (if multiple levels)',
    },
    is2: {
      type: 'para',
      description: 'Introduction section heading, level 2',
    },
    it: {
      type: 'char',
      description: 'A character style, use italic text',
    },
    jmp: {
      type: 'char',
      defaultAttribute: 'href',
      description: 'For associating linking attributes to a span of text',
    },
    k: {
      type: 'char',
      defaultAttribute: 'key',
      description: 'For a keyword',
    },
    k1: {
      type: 'para',
      description: 'Concordance main entry text or keyword, level 1',
    },
    k2: {
      type: 'para',
      description: 'Concordance main entry text or keyword, level 2',
    },
    lf: {
      type: 'para',
      description: 'List footer (introductory remark)',
    },
    lh: {
      type: 'para',
      description: 'List header (introductory remark)',
    },
    li: {
      type: 'para',
      description: 'A list entry, level 1 (if single level)',
    },
    li1: {
      type: 'para',
      description: 'A list entry, level 1 (if multiple levels)',
    },
    li2: {
      type: 'para',
      description: 'A list entry, level 2',
    },
    li3: {
      type: 'para',
      description: 'A list entry, level 3',
    },
    li4: {
      type: 'para',
      description: 'A list entry, level 4',
    },
    lik: {
      type: 'char',
      description: 'Structured list entry key text',
    },
    lim: {
      type: 'para',
      description: 'An embedded list entry, level 1 (if single level)',
    },
    lim1: {
      type: 'para',
      description: 'An embedded list entry, level 1 (if multiple levels)',
    },
    lim2: {
      type: 'para',
      description: 'An embedded list entry, level 2',
    },
    lim3: {
      type: 'para',
      description: 'An embedded list entry, level 3',
    },
    lim4: {
      type: 'para',
      description: 'An embedded list entry, level 4',
    },
    lit: {
      type: 'para',
      description: 'For a comment or note inserted for liturgical use',
    },
    litl: {
      type: 'char',
      description: 'List entry total text',
    },
    liv: {
      type: 'char',
      description: 'Structured list entry value 1 content (if single value)',
    },
    liv1: {
      type: 'char',
      description: 'Structured list entrt value 1 content (if multiple values)',
    },
    liv2: {
      type: 'char',
      description: 'Structured list entry value 2 content',
    },
    liv3: {
      type: 'char',
      description: 'Structured list entry value 3 content',
    },
    liv4: {
      type: 'char',
      description: 'Structured list entry value 4 content',
    },
    liv5: {
      type: 'char',
      description: 'Structured list entry value 5 content',
    },
    m: {
      type: 'para',
      description:
        'Paragraph text, with no first line indent (may occur after poetry) aka: Paragraph Continuation',
    },
    mi: {
      type: 'para',
      description: 'Paragraph text, indented, with no first line indent; often used for discourse',
    },
    mi1: {
      type: 'para',
      description:
        'Paragraph text, level 1 indented, with no first line indent; often used for discourse',
    },
    mi2: {
      type: 'para',
      description:
        'Paragraph text, level 2 indented, with no first line indent; often used for discourse',
    },
    mi3: {
      type: 'para',
      description:
        'Paragraph text, level 3 indented, with no first line indent; often used for discourse',
    },
    mi4: {
      type: 'para',
      description:
        'Paragraph text, level 4 indented, with no first line indent; often used for discourse',
    },
    mr: {
      type: 'para',
      description: 'A major section division references range heading',
    },
    ms: {
      type: 'para',
      description: 'A major section division heading, level 1 (if single level)',
    },
    ms1: {
      type: 'para',
      description: 'A major section division heading, level 1 (if multiple levels)',
    },
    ms2: {
      type: 'para',
      description: 'A major section division heading, level 2',
    },
    ms3: {
      type: 'para',
      description: 'A major section division heading, level 3',
    },
    mt: {
      type: 'para',
      description: 'The main title of the book (if single level)',
    },
    mt1: {
      type: 'para',
      description: 'The main title of the book (if multiple levels)',
    },
    mt2: {
      type: 'para',
      description: 'A secondary title usually occurring before the main title',
    },
    mt3: {
      type: 'para',
      description: 'A tertiary title occurring after the main title',
    },
    mt4: {
      type: 'para',
      description: 'The main title of the book (if single level)',
    },
    mte: {
      type: 'para',
      description:
        'The main title of the book repeated at the end of the book, level 1 (if single level)',
    },
    mte1: {
      type: 'para',
      description:
        'The main title of the book repeat /ed at the end of the book, level 1 (if multiple levels)',
    },
    mte2: {
      type: 'para',
      description: "A secondary title occurring before or after the 'ending' main title",
    },
    nb: {
      type: 'para',
      description:
        'Paragraph text, with no break from previous paragraph text (at chapter boundary)',
    },
    nd: {
      type: 'char',
      description: 'For name of deity',
    },
    ndx: {
      type: 'char',
      description: 'A subject index text item',
    },
    no: {
      type: 'char',
      description: 'A character style, use normal text',
    },
    optbreak: {
      type: 'optbreak',
    },
    ord: {
      type: 'char',
      description: 'For the text portion of an ordinal number',
    },
    p: {
      type: 'para',
      description: 'Paragraph text, with first line indent',
    },
    p1: {
      type: 'para',
      description: 'Front or back matter text paragraph, level 1 (if multiple levels)',
    },
    p2: {
      type: 'para',
      description: 'Front or back matter text paragraph, level 2 (if multiple levels)',
    },
    pb: {
      type: 'para',
      description:
        "Page Break used for new reader portions and children's bibles where content is controlled by the page",
    },
    pc: {
      type: 'para',
      description: 'Inscription (paragraph text centered)',
    },
    periph: {
      type: 'periph',
      textContentAttribute: 'alt',
    },
    ph: {
      type: 'para',
      description:
        'Paragraph text, with level 1 hanging indent (if single level) (DEPRECATED - use para@style li#)',
    },
    ph1: {
      type: 'para',
      description: 'Paragraph text, with level 1 hanging indent (if multiple levels)',
    },
    ph2: {
      type: 'para',
      description: 'Paragraph text, with level 2 hanging indent',
    },
    ph3: {
      type: 'para',
      description: 'Paragraph text, with level 3 hanging indent',
    },
    pi: {
      type: 'para',
      description:
        'Paragraph text, level 1 indent (if single level), with first line indent; often used for discourse',
    },
    pi1: {
      type: 'para',
      description:
        'Paragraph text, level 1 indent (if multiple levels), with first line indent; often used for discourse',
    },
    pi2: {
      type: 'para',
      description:
        'Paragraph text, level 2 indent, with first line indent; often used for discourse',
    },
    pi3: {
      type: 'para',
      description:
        'Paragraph text, level 3 indent, with first line indent; often used for discourse',
    },
    pm: {
      type: 'para',
      description: 'Embedded text paragraph',
    },
    pmc: {
      type: 'para',
      description: 'Embedded text closing',
    },
    pmo: {
      type: 'para',
      description: 'Embedded text opening',
    },
    pmr: {
      type: 'para',
      description: 'Embedded text refrain',
    },
    pn: {
      type: 'char',
      description: 'For a proper name',
    },
    png: {
      type: 'char',
      description: 'For a geographic proper name',
    },
    po: {
      type: 'para',
      description: 'Letter opening',
    },
    pr: {
      type: 'para',
      description: 'Text refrain (paragraph right-aligned)',
    },
    pro: {
      type: 'char',
      description: 'For indicating pronunciation in CJK texts (DEPRECATED - used char@style rb)',
    },
    q: {
      type: 'para',
      description: 'Poetry text, level 1 indent (if single level)',
    },
    q1: {
      type: 'para',
      description: 'Poetry text, level 1 indent (if multiple levels)',
    },
    q2: {
      type: 'para',
      description: 'Poetry text, level 2 indent',
    },
    q3: {
      type: 'para',
      description: 'Poetry text, level 3 indent',
    },
    q4: {
      type: 'para',
      description: 'Poetry text, level 4 indent',
    },
    qa: {
      type: 'para',
      description: 'Poetry text, Acrostic marker/heading',
    },
    qac: {
      type: 'char',
      description:
        'Poetry text, Acrostic markup of the first character of a line of acrostic poetry',
    },
    qc: {
      type: 'para',
      description: 'Poetry text, centered',
    },
    qd: {
      type: 'para',
      description:
        'A Hebrew musical performance annotation, similar in content to Hebrew descriptive title.',
    },
    qm: {
      type: 'para',
      description: 'Poetry text, embedded, level 1 indent (if single level)',
    },
    qm1: {
      type: 'para',
      description: 'Poetry text, embedded, level 1 indent (if multiple levels)',
    },
    qm2: {
      type: 'para',
      description: 'Poetry text, embedded, level 2 indent',
    },
    qm3: {
      type: 'para',
      description: 'Poetry text, embedded, level 3 indent',
    },
    qr: {
      type: 'para',
      description: 'Poetry text, Right Aligned',
    },
    qs: {
      type: 'char',
      description: 'Poetry text, Selah',
    },
    qt: {
      type: 'char',
      description: 'For Old Testament quoted text appearing in the New Testament',
    },
    'qt-e': {
      type: 'ms',
      defaultAttribute: 'eid',
    },
    'qt-s': {
      type: 'ms',
      defaultAttribute: 'who',
    },
    'qt1-e': {
      type: 'ms',
      defaultAttribute: 'eid',
    },
    'qt1-s': {
      type: 'ms',
      defaultAttribute: 'who',
    },
    'qt2-e': {
      type: 'ms',
      defaultAttribute: 'eid',
    },
    'qt2-s': {
      type: 'ms',
      defaultAttribute: 'who',
    },
    'qt3-e': {
      type: 'ms',
      defaultAttribute: 'eid',
    },
    'qt3-s': {
      type: 'ms',
      defaultAttribute: 'who',
    },
    'qt4-e': {
      type: 'ms',
      defaultAttribute: 'eid',
    },
    'qt4-s': {
      type: 'ms',
      defaultAttribute: 'who',
    },
    'qt5-e': {
      type: 'ms',
      defaultAttribute: 'eid',
    },
    'qt5-s': {
      type: 'ms',
      defaultAttribute: 'who',
    },
    r: {
      type: 'para',
      description: 'Parallel reference(s)',
    },
    rb: {
      type: 'char',
      defaultAttribute: 'gloss',
    },
    ref: {
      type: 'ref',
      defaultAttribute: 'loc',
    },
    rem: {
      type: 'para',
      description: 'Remark',
    },
    restore: {
      type: 'para',
      description: 'Comment about when text was restored',
    },
    rq: {
      type: 'char',
      description: 'A cross-reference indicating the source text for the preceding quotation.',
    },
    s: {
      type: 'para',
      description: 'A section heading, level 1 (if single level)',
    },
    s1: {
      type: 'para',
      description: 'A section heading, level 1 (if multiple levels)',
    },
    s2: {
      type: 'para',
      description: 'A section heading, level 2 (e.g. Proverbs 22-24)',
    },
    s3: {
      type: 'para',
      description:
        'A section heading, level 3 (e.g. Genesis "The First Day") (\\s3 can take a \\v!)',
    },
    s4: {
      type: 'para',
      description: 'A section heading, level 4',
    },
    sc: {
      type: 'char',
      description: 'A character style, for small capitalization text',
    },
    sd: {
      type: 'para',
      description:
        'Vertical space used to divide the text into sections, level 1 (if single level)',
    },
    sd1: {
      type: 'para',
      description:
        'Semantic division location (vertical space used to divide the text into sections), level 1 (if multiple levels)',
    },
    sd2: {
      type: 'para',
      description:
        'Semantic division location (vertical space used to divide the text into sections), level 2',
    },
    sd3: {
      type: 'para',
      description:
        'Semantic division location (vertical space used to divide the text into sections), level 3',
    },
    sd4: {
      type: 'para',
      description:
        'Semantic division location (vertical space used to divide the text into sections), level 4',
    },
    sig: {
      type: 'char',
      description: 'For the signature of the author of an Epistle',
    },
    sls: {
      type: 'char',
      description:
        'To represent where the original text is in a secondary language or from an alternate text source',
    },
    sp: {
      type: 'para',
      description: 'A heading, to identify the speaker (e.g. Job)',
    },
    sr: {
      type: 'para',
      description: 'A section division references range heading',
    },
    sts: {
      type: 'para',
      description: 'Status\nRemark',
    },
    sup: {
      type: 'char',
      description:
        'A character style, for superscript text. Typically for use in critical edition footnotes.',
    },
    't-e': {
      type: 'ms',
      defaultAttribute: 'eid',
    },
    't-s': {
      type: 'ms',
      defaultAttribute: 'sid',
    },
    table: {
      type: 'table',
    },
    tl: {
      type: 'char',
      description: 'For transliterated words',
    },
    toc1: {
      type: 'para',
      description: 'Long table of contents text',
    },
    toc2: {
      type: 'para',
      description: 'Short table of contents text',
    },
    toc3: {
      type: 'para',
      description: 'Book Abbreviation',
    },
    toca1: {
      type: 'para',
      description: 'Alternative language long table of contents text',
    },
    toca2: {
      type: 'para',
      description: 'Alternative language short table of contents text',
    },
    toca3: {
      type: 'para',
      description: 'Alternative language book Abbreviation',
    },
    tr: {
      type: 'row',
    },
    ts: {
      type: 'ms',
    },
    'ts-e': {
      type: 'ms',
      defaultAttribute: 'eid',
    },
    'ts-s': {
      type: 'ms',
      defaultAttribute: 'sid',
    },
    usfm: {
      type: 'para',
      textContentAttribute: 'version',
      parseUsfmInstructions:
        "If this marker is directly after the first id marker, this marker's version attribute should determine the version attribute of the usx or USJ marker at the top of the USX or USJ document, then this marker should be removed.",
    },
    USJ: {
      type: 'USJ',
      textContentAttribute: 'version',
      markerUsfm: 'usfm',
    },
    usx: {
      type: 'usx',
      textContentAttribute: 'version',
      markerUsfm: 'usfm',
    },
    v: {
      type: 'verse',
      leadingAttributes: ['number'],
      attributeMarkers: ['va', 'vp'],
    },
    va: {
      type: 'char',
      attributeMarkerAttributeName: 'altnumber',
      isAttributeMarkerFor: ['v'],
      hasStructuralSpaceAfterCloseAttributeMarker: true,
    },
    vp: {
      type: 'char',
      description:
        'Published verse marker - this is a verse marking that would be used in the published text',
      attributeMarkerAttributeName: 'pubnumber',
      isAttributeMarkerFor: ['v'],
      hasStructuralSpaceAfterCloseAttributeMarker: true,
    },
    w: {
      type: 'char',
      defaultAttribute: 'lemma',
    },
    wa: {
      type: 'char',
      description: 'An Aramaic wordlist text item',
    },
    wg: {
      type: 'char',
      description: 'A Greek Wordlist text item',
    },
    wh: {
      type: 'char',
      description: 'A Hebrew wordlist text item',
    },
    wj: {
      type: 'char',
      description: 'For marking the words of Jesus',
    },
    x: {
      type: 'note',
      description: 'Cross reference',
      leadingAttributes: ['caller'],
      attributeMarkers: ['cat'],
    },
    xdc: {
      type: 'char',
      description:
        'Cross-reference target reference(s), Deuterocanon only (DEPRECATED - use char@style dc)',
      isClosingMarkerOptional: true,
    },
    xk: {
      type: 'char',
      description: 'A cross reference keyword',
      isClosingMarkerOptional: true,
    },
    xnt: {
      type: 'char',
      description: 'Cross-reference target reference(s), New Testament only',
      isClosingMarkerOptional: true,
    },
    xo: {
      type: 'char',
      description: 'The cross reference origin reference',
      isClosingMarkerOptional: true,
    },
    xop: {
      type: 'char',
      description:
        'Published cross reference origin text (origin reference that should appear in the published text)',
      isClosingMarkerOptional: true,
    },
    xot: {
      type: 'char',
      description: 'Cross-reference target reference(s), Old Testament only',
      isClosingMarkerOptional: true,
    },
    xq: {
      type: 'char',
      description: 'A cross-reference quotation from the scripture text',
      isClosingMarkerOptional: true,
    },
    xt: {
      type: 'char',
      defaultAttribute: 'href',
      description:
        'Inline scripture reference formatting.\nThe cross reference target reference(s), protocanon only',
      isClosingMarkerOptional: true,
    },
    xta: {
      type: 'char',
      description: 'Cross reference target references added text',
      isClosingMarkerOptional: true,
    },
  },
  markersRegExp: {
    't[hc][rc]?\\d+(-\\d+)?': {
      type: 'cell',
    },
  },
  markerTypes: {
    book: {},
    cell: {
      skipOutputAttributeToUsfm: ['align'],
      outputToUsfmInstructions:
        "If this marker has a colspan attribute, the USFM marker name should be this marker's name plus hyphen (-) plus the marker's final column number (first column number found in the marker name plus colspan minus 1). Then the colspan attribute should not be output as a USFM attribute.",
      parseUsfmInstructions:
        "If this marker's name has a hyphen (-) and a number after the marker, the USX/USJ marker name should be just the portion of the marker name before the hyphen, and it should have the colspan attribute which is the number of columns spanned by the marker (second column number plus 1 minus first column number).",
      markerTypeUsj: 'table:cell',
    },
    chapter: {
      hasNewlineBefore: true,
      skipOutputAttributeToUsfm: ['sid'],
      skipOutputMarkerToUsfmIfAttributeIsPresent: ['eid'],
    },
    char: {
      hasClosingMarker: true,
      nestedPrefix: '+',
    },
    figure: {
      hasClosingMarker: true,
      outputToUsfmInstructions: 'The USX/USJ file attribute needs its name changed to src in USFM',
      parseUsfmInstructions: 'The USFM src attribute needs its name changed to file in USX/USJ',
    },
    ms: {
      hasClosingMarker: true,
      isClosingMarkerEmpty: true,
    },
    note: {
      hasClosingMarker: true,
    },
    optbreak: {
      hasStyleAttribute: false,
    },
    para: {
      hasNewlineBefore: true,
      skipOutputAttributeToUsfm: ['vid'],
    },
    periph: {
      hasNewlineBefore: true,
      hasStyleAttribute: false,
    },
    ref: {
      hasClosingMarker: true,
      hasStyleAttribute: false,
      skipOutputMarkerToUsfmIfAttributeIsPresent: ['gen'],
    },
    row: {
      hasNewlineBefore: true,
      markerTypeUsj: 'table:row',
    },
    sidebar: {
      hasNewlineBefore: true,
    },
    table: {
      hasStyleAttribute: false,
      skipOutputAttributeToUsfm: ['vid'],
      skipOutputMarkerToUsfm: true,
    },
    'table:cell': {
      skipOutputAttributeToUsfm: ['align'],
      outputToUsfmInstructions:
        "If this marker has a colspan attribute, the USFM marker name should be this marker's name plus hyphen (-) plus the marker's final column number (first column number found in the marker name plus colspan minus 1). Then the colspan attribute should not be output as a USFM attribute.",
      parseUsfmInstructions:
        "If this marker's name has a hyphen (-) and a number after the marker, the USX/USJ marker name should be just the portion of the marker name before the hyphen, and it should have the colspan attribute which is the number of columns spanned by the marker (second column number plus 1 minus first column number).",
      markerTypeUsj: 'table:cell',
      markerTypeUsfm: 'cell',
      markerTypeUsx: 'cell',
    },
    'table:row': {
      hasNewlineBefore: true,
      markerTypeUsj: 'table:row',
      markerTypeUsfm: 'row',
      markerTypeUsx: 'row',
    },
    unmatched: {
      description:
        'Paratext uses this type for closing markers that it cannot find opening markers for. They are treated like char markers but have no contents, no closing markers, and no space after the marker.',
      outputToUsfmInstructions:
        'Do not output a structural space after the opening marker for markers with unmatched type.',
      parseUsfmInstructions:
        'If a closing marker occurs but does not seem to have a matching opening marker, create an unmatched-type marker. There is no structural space after the unmatched-type marker; its end is determined by the asterisk at the end of the marker.',
    },
    USJ: {
      hasNewlineBefore: true,
      hasStyleAttribute: false,
      skipOutputAttributeToUsfm: ['noNamespaceSchemaLocation'],
      outputToUsfmInstructions:
        "If this marker is the top-level marker containing all other markers in this document, it should not be directly output to USFM. Instead, if this marker's version attribute is other than 3.0, a new usfm marker with this version attribute needs to be added after the id marker if one is present in the USFM.",
    },
    usx: {
      hasNewlineBefore: true,
      hasStyleAttribute: false,
      skipOutputAttributeToUsfm: ['noNamespaceSchemaLocation'],
      outputToUsfmInstructions:
        "If this marker is the top-level marker containing all other markers in this document, it should not be directly output to USFM. Instead, if this marker's version attribute is other than 3.0, a new usfm marker with this version attribute needs to be added after the id marker if one is present in the USFM.",
    },
    verse: {
      hasNewlineBefore: true,
      skipOutputAttributeToUsfm: ['sid'],
      skipOutputMarkerToUsfmIfAttributeIsPresent: ['eid'],
    },
  },
});

/**
 * A map of all USFM/USX/USJ markers and some information about them. Generated from a `usx.rng`
 * file and adjusted to reflect the way Paratext 9.4 handles USFM.
 */
export const USFM_MARKERS_MAP_PARATEXT: MarkersMap = Object.freeze({
  ...USFM_MARKERS_MAP,
  isSpaceAfterAttributeMarkersContent: true,
  shouldOptionalClosingMarkersBePresent: true,
});
