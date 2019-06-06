import AvailableFiles from "./AvailableFiles";
import StorageStandard from './StorageStandard.js'
import StreamsStandard from './StreamsStandard.js'
import XMLHttpRequestStandard from './XMLHttpRequestStandard.js'

const availableFiles = AvailableFiles({
    root: '[data-widget="available-files"]',
    list: '[data-available-files="list"]',
    download: '[data-available-files="download"]'
});

availableFiles.create([
    {name: 'Storage Standard', data: StorageStandard},
    {name: 'Streams Standard', data: StreamsStandard},
    {name: 'XMLHttpRequest Standard', data: XMLHttpRequestStandard},
]);
