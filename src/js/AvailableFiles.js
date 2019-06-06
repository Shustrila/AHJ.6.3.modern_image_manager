class AvailableFiles {
    constructor(){
        this._root = '';
        this._list = '';
        this._download = '';
        this._downloadSize = 0;
    }

    init(obj) {
        this._root = obj.root;
        this._list = obj.list;
        this._download = obj.download;

        return this;
    }

    static _countSize(file) {
        return new Promise((resolve, reject) => {
            const blob = new Blob([file.data]);
            const read = new FileReader();
            const sizeFile = Number(blob.size / 1024);
            let data = {};

            read.addEventListener('load', e => {
                data.size = +sizeFile.toFixed(0);
                data.data = e.target.result;

                resolve(data)
            });
            read.addEventListener('error', e => {
                reject(e.target.error);

            });

            read.readAsDataURL(blob);
        });
    }


    async _createItem(root, list, file) {
        const info = await AvailableFiles._countSize(file);

        const name = document.createElement('p');
        name.className = 'available-files__item-name';
        name.innerHTML = file.name;

        const size = document.createElement('p');
        size.className = 'available-files__item-size';
        size.innerHTML = info.size + ' kb';

        const download = document.createElement('a');
        download.className = 'available-files__item-download';
        download.href = file.data;
        download.download = file.name;
        download.rel = 'noopener';
        download.innerHTML = 'Download';
        download.addEventListener('click', this._downloadFile.bind(this, info));

        const item = document.createElement('li');
        item.className = 'available-files__item';
        item.appendChild(name);
        item.appendChild(size);
        item.appendChild(download);

        list.appendChild(item);
    }

    _downloadFile(info) {
        this._downloadSize += +(info.size / 1024).toFixed(2);

        const root = document.querySelector(this._root);
        const download = root.querySelector(this._download);

        download.innerHTML = this._downloadSize;
    }

    create(arrayFiles) {
        const root = document.querySelector(this._root);
        const list = root.querySelector(this._list);
        const download = root.querySelector(this._download);

        download.innerHTML = this._downloadSize;

        for (const file of arrayFiles) {
            this._createItem(root, list, file);
        }
    }
}

export default (obj) => new AvailableFiles().init(obj);
