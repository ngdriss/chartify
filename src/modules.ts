
import {
    TuiActiveZoneModule,
    TuiAlertHostModule,
    TuiAutoFocusModule,
    TuiAutofilledModule,
    TuiCheckedModule,
    TuiClickOutsideModule,
    TuiControlModule,
    TuiCopyProcessorModule,
    TuiDialogHostModule,
    TuiDragModule,
    TuiDropdownHostModule,
    TuiDroppableModule,
    TuiElementModule,
    TuiFilterPipeModule,
    TuiFocusTrapModule,
    TuiFocusVisibleModule,
    TuiFocusableModule,
    TuiFocusedModule,
    TuiForAsyncModule,
    TuiForModule,
    TuiHighDpiModule,
    TuiHoveredModule,
    TuiIsPresentPipeModule,
    TuiItemModule,
    TuiKeysPipeModule,
    TuiLetModule,
    TuiMapperPipeModule,
    TuiMediaModule,
    TuiObscuredModule,
    TuiOverscrollModule,
    TuiPanModule,
    TuiPlatformModule,
    TuiPortalModule,
    TuiPressedModule,
    TuiPreventDefaultModule,
    TuiRepeatTimesModule,
    TuiReplacePipeModule,
    TuiResizeModule,
    TuiResizerModule,
    TuiScrollControlsModule,
    TuiSwipeModule,
    TuiValidatorModule,
    TuiValueChangesModule,
    TuiZoomModule
} from '@taiga-ui/cdk';
import {
    TuiAlertModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiCalendarSheetPipeModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiDropdownModule,
    TuiErrorModule,
    TuiExpandModule,
    TuiFlagPipeModule,
    TuiFormatDatePipeModule,
    TuiFormatNumberPipeModule,
    TuiFormatPhonePipeModule,
    TuiGroupModule,
    TuiHintModule,
    TuiHintsHostModule,
    TuiHostedDropdownModule,
    TuiLabelModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiMaskAccessorModule,
    TuiModeModule,
    TuiMonthPipeModule,
    TuiNotificationModule,
    TuiNumberFormatModule,
    TuiPrimitiveCalendarModule,
    TuiPrimitiveCheckboxModule,
    TuiPrimitiveSpinButtonModule,
    TuiPrimitiveTextfieldModule,
    TuiPrimitiveYearMonthPaginationModule,
    TuiPrimitiveYearPickerModule,
    TuiRootModule,
    TuiScrollIntoViewModule,
    TuiScrollbarModule,
    TuiSvgDefsHostModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiThemeNightModule,
    TuiTooltipModule,
    TuiWrapperModule
} from '@taiga-ui/core';
import {
    TextMaskModule,
    TuiAccordionModule,
    TuiActionModule,
    TuiArrowModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiBadgedContentModule,
    TuiBreadcrumbsModule,
    TuiCalendarMonthModule,
    TuiCalendarRangeModule,
    TuiCarouselModule,
    TuiCheckboxBlockModule,
    TuiCheckboxLabeledModule,
    TuiCheckboxModule,
    TuiComboBoxModule,
    TuiDataListDropdownManagerModule,
    TuiDataListWrapperModule,
    TuiElasticContainerModule,
    TuiExtractCountryCodeModule,
    TuiFieldErrorPipeModule,
    TuiFilesModule,
    TuiFilterByInputPipeModule,
    TuiFilterModule,
    TuiHighlightModule,
    TuiInputCopyModule,
    TuiInputCountModule,
    TuiInputDateModule,
    TuiInputDateMultiModule,
    TuiInputDateRangeModule,
    TuiInputDateTimeModule,
    TuiInputFilesModule,
    TuiInputInlineModule,
    TuiInputModule,
    TuiInputMonthModule,
    TuiInputMonthRangeModule,
    TuiInputNumberModule,
    TuiInputPasswordModule,
    TuiInputPhoneInternationalModule,
    TuiInputPhoneModule,
    TuiInputRangeModule,
    TuiInputSliderModule,
    TuiInputTagModule,
    TuiInputTimeModule,
    TuiInputYearModule,
    TuiIslandModule,
    TuiIsoToCountryCodeModule,
    TuiItemsWithMoreModule,
    TuiLazyLoadingModule,
    TuiLineClampModule,
    TuiMarkerIconModule,
    TuiMultiSelectModule,
    TuiMultiSelectOptionModule,
    TuiPaginationModule,
    TuiPdfViewerModule,
    TuiPresentModule,
    TuiPrimitiveCalendarRangeModule,
    TuiProgressModule,
    TuiProjectClassModule,
    TuiPromptModule,
    TuiPushModule,
    TuiRadioBlockModule,
    TuiRadioGroupModule,
    TuiRadioLabeledModule,
    TuiRadioListModule,
    TuiRadioModule,
    TuiRangeModule,
    TuiRatingModule,
    TuiRoutableDialogModule,
    TuiSelectModule,
    TuiSelectOptionModule,
    TuiSliderModule,
    TuiSortCountriesPipeModule,
    TuiStepperModule,
    TuiStringifyContentPipeModule,
    TuiStringifyPipeModule,
    TuiTabsModule,
    TuiTagModule,
    TuiTextAreaModule,
    TuiTextareaModule,
    TuiTilesModule,
    TuiToYearPipeModule,
    TuiToggleModule,
    TuiTreeModule,
    TuiUnfinishedValidatorModule,
    TuiUnmaskHandlerModule,
    TuiValueAccessorModule
} from '@taiga-ui/kit';
import {
    TuiPreviewActionModule,
    TuiPreviewDialogModule,
    TuiPreviewModule
} from '@taiga-ui/addon-preview';

import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaskitoModule} from '@maskito/angular';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';


export const ALL_TAIGA_UI_MODULES = [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    PolymorpheusModule,
    MaskitoModule,
    RouterModule.forRoot([]),
    /* CDK */
    TuiActiveZoneModule,
    TuiAlertHostModule,
    TuiAutoFocusModule,
    TuiAutofilledModule,
    TuiCheckedModule,
    TuiClickOutsideModule,
    TuiControlModule,
    TuiCopyProcessorModule,
    TuiDialogHostModule,
    TuiDragModule,
    TuiDropdownHostModule,
    TuiDroppableModule,
    TuiElementModule,
    TuiFilterPipeModule,
    TuiFocusTrapModule,
    TuiFocusVisibleModule,
    TuiFocusableModule,
    TuiFocusedModule,
    TuiForAsyncModule,
    TuiForModule,
    TuiHighDpiModule,
    TuiHoveredModule,
    TuiIsPresentPipeModule,
    TuiItemModule,
    TuiKeysPipeModule,
    TuiLetModule,
    TuiMapperPipeModule,
    TuiMediaModule,
    TuiObscuredModule,
    TuiOverscrollModule,
    TuiPanModule,
    TuiPlatformModule,
    TuiPortalModule,
    TuiPressedModule,
    TuiPreventDefaultModule,
    TuiRepeatTimesModule,
    TuiReplacePipeModule,
    TuiResizeModule,
    TuiResizerModule,
    TuiScrollControlsModule,
    TuiSwipeModule,
    TuiValidatorModule,
    TuiValueChangesModule,
    TuiZoomModule,
    /* CORE */
    TuiAlertModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiCalendarSheetPipeModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiDropdownModule,
    TuiErrorModule,
    TuiExpandModule,
    TuiFlagPipeModule,
    TuiFormatDatePipeModule,
    TuiFormatNumberPipeModule,
    TuiFormatPhonePipeModule,
    TuiGroupModule,
    TuiHintModule,
    TuiHintsHostModule,
    TuiHostedDropdownModule,
    TuiLabelModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiMaskAccessorModule,
    TuiModeModule,
    TuiMonthPipeModule,
    TuiNotificationModule,
    TuiNumberFormatModule,
    TuiPrimitiveCalendarModule,
    TuiPrimitiveCheckboxModule,
    TuiPrimitiveSpinButtonModule,
    TuiPrimitiveTextfieldModule,
    TuiPrimitiveYearMonthPaginationModule,
    TuiPrimitiveYearPickerModule,
    TuiRootModule,
    TuiScrollIntoViewModule,
    TuiScrollbarModule,
    TuiSvgDefsHostModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiThemeNightModule,
    TuiTooltipModule,
    TuiWrapperModule,
    /* KIT */
    TextMaskModule,
    TuiAccordionModule,
    TuiActionModule,
    TuiArrowModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiBadgedContentModule,
    TuiBreadcrumbsModule,
    TuiCalendarMonthModule,
    TuiCalendarRangeModule,
    TuiCarouselModule,
    TuiCheckboxBlockModule,
    TuiCheckboxLabeledModule,
    TuiCheckboxModule,
    TuiComboBoxModule,
    TuiDataListDropdownManagerModule,
    TuiDataListWrapperModule,
    TuiElasticContainerModule,
    TuiExtractCountryCodeModule,
    TuiFieldErrorPipeModule,
    TuiFilesModule,
    TuiFilterByInputPipeModule,
    TuiFilterModule,
    TuiHighlightModule,
    TuiInputCopyModule,
    TuiInputCountModule,
    TuiInputDateModule,
    TuiInputDateMultiModule,
    TuiInputDateRangeModule,
    TuiInputDateTimeModule,
    TuiInputFilesModule,
    TuiInputInlineModule,
    TuiInputModule,
    TuiInputMonthModule,
    TuiInputMonthRangeModule,
    TuiInputNumberModule,
    TuiInputPasswordModule,
    TuiInputPhoneInternationalModule,
    TuiInputPhoneModule,
    TuiInputRangeModule,
    TuiInputSliderModule,
    TuiInputTagModule,
    TuiInputTimeModule,
    TuiInputYearModule,
    TuiIslandModule,
    TuiIsoToCountryCodeModule,
    TuiItemsWithMoreModule,
    TuiLazyLoadingModule,
    TuiLineClampModule,
    TuiMarkerIconModule,
    TuiMultiSelectModule,
    TuiMultiSelectOptionModule,
    TuiPaginationModule,
    TuiPdfViewerModule,
    TuiPresentModule,
    TuiPrimitiveCalendarRangeModule,
    TuiProgressModule,
    TuiProjectClassModule,
    TuiPromptModule,
    TuiPushModule,
    TuiRadioBlockModule,
    TuiRadioGroupModule,
    TuiRadioLabeledModule,
    TuiRadioListModule,
    TuiRadioModule,
    TuiRangeModule,
    TuiRatingModule,
    TuiRoutableDialogModule,
    TuiSelectModule,
    TuiSelectOptionModule,
    TuiSliderModule,
    TuiSortCountriesPipeModule,
    TuiStepperModule,
    TuiStringifyContentPipeModule,
    TuiStringifyPipeModule,
    TuiTabsModule,
    TuiTagModule,
    TuiTextAreaModule,
    TuiTextareaModule,
    TuiTilesModule,
    TuiToYearPipeModule,
    TuiToggleModule,
    TuiTreeModule,
    TuiUnfinishedValidatorModule,
    TuiUnmaskHandlerModule,
    TuiValueAccessorModule,

    /* ADDON-PREVIEW */
    TuiPreviewActionModule,
    TuiPreviewDialogModule,
    TuiPreviewModule,

];
