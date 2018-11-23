/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";

    // Brackets Modules
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        ProjectManager = brackets.getModule('project/ProjectManager'),
        FileSystem = brackets.getModule('filesystem/FileSystem'),
        FileUtils = brackets.getModule('file/FileUtils'),
        DocumentManager = brackets.getModule('document/DocumentManager'),
        DefaultDialogs = brackets.getModule('widgets/DefaultDialogs'),
        Dialogs = brackets.getModule('widgets/Dialogs'),
        LiveDevelopment = brackets.getModule('LiveDevelopment/LiveDevelopment');

    // Global Vars
    var _pref = "mr",
        _structure = "-structure/",
        _data;

    // Content Vars
    var egHtml,
        egData;

    egHtml =
        '<!DOCTYPE html>\n' +
        '<html lang=\"en\">\n' +
        '<head>\n' +
        '    <meta charset=\"UTF-8\">\n' +
        '    <title>Minimal Replace Example</title>\n' +
        '    <style>\n' +
        '        body {\n' +
        '            background: #2e4052;\n' +
        '            font-family: sans-serif;\n' +
        '            color: #f9f9f9;\n' +
        '        }\n' +
        '        .card {\n' +
        '            margin: 0 3em;\n' +
        '            position: absolute;\n' +
        '            top: 50%;\n' +
        '            transform: perspective(1px) translateY(-50%);\n' +
        '        }\n' +
        '        a { color: #f9f9f9; }\n' +
        '    </style>\n' +
        '</head>\n' +
        '<body>\n' +
        '    <div class=\'card\'>\n' +
        '        <h5>Hello</h5>\n' +
        '        <h1>I\'m {{::name}}</h1>\n' +
        '        <h2>from the {{::planet}}</h2>\n' +
        '        <p><i>This is an example page of Minimal Replace, for more information, find us on <a href=\"{{::mr-link}}\">Github</a></i></p>\n' +
        '    </div>\n' +
        '    <script src=\"example.js\"></script>\n' +
        '    <script src=\"https://arturguedes.github.io/MinimalReplace/js/minimalreplace.min.js\"></script>\n' +
        '</body>\n' +
        '</html>';

    egData =
        'mr_data = {\n' +
        '    \"name\": \"Arthur Phillip Dent\",\n' +
        '    \"planet\": \"Earth\",\n' +
        '    \"mr-link\": \"https://github.com/ArturGuedes/MinimalReplace\"\n' +
        '}';

    // Common Methods
    function error(err) {
        console.log("Error: " + err);
    }

    function dialog(title, content) {
        Dialogs.showModalDialog(
            DefaultDialogs.DIALOG_ID_INFO, title, content);
    }

    function createFile(path, filename, content) {
        var file = FileSystem.getFileForPath(path + filename);

        FileUtils.writeText(file, content, true).done(function () {
            //console.log("Text successfully updated");
        }).fail(function (err) {
            error(err.name);
        });
    }

    // Core Methods
    function init() {
        var _fileName = DocumentManager.getCurrentDocument().file["name"],
            _fileNameWE = FileUtils.getFilenameWithoutExtension(_fileName),
            _pathProject = ProjectManager.getProjectRoot().fullPath,
            _pathStructure = _pathProject + _pref + _structure;

        brackets.fs.makedir(_pathStructure, 777);
        createFile(_pathStructure, "example.html", egHtml);
        createFile(_pathStructure, "example.js", egData);
        dialog(
            "Minimal Replace",
            "<center><i>Folder and sample files successfully created in this project.</i>" +
            "<p>For more information, find us on <a href=\"https://github.com/ArturGuedes/MinimalReplace/\">Github</a></p>"
        );
    }

    function replace() {
        //LiveDevelopment.reload();

        if (DocumentManager.getCurrentDocument().file['parentPath'].includes(_pref)) {
            var _fileName = DocumentManager.getCurrentDocument().file["name"],
                _fileNameWE = FileUtils.getFilenameWithoutExtension(_fileName),
                _pathProject = ProjectManager.getProjectRoot().fullPath,
                _pathStructure = _pathProject + _pref + _structure,
                _data,
                _dataHTML,
                fileData = FileSystem.getFileForPath(_pathStructure + _fileNameWE + '.js'),
                fileHTML = FileSystem.getFileForPath(_pathStructure + _fileNameWE + '.html'),
                fileFINAL = FileSystem.getFileForPath(_pathProject + _fileNameWE + '.html');

            FileUtils.readAsText(fileData).done(function (rawText, readTimestamp) {
                rawText = rawText.replace("mr_data = ", "");
                _data = JSON.parse(rawText);
                FileUtils.readAsText(fileHTML).done(function (rawText, readTimestamp) {
                    _dataHTML = rawText;
                    for (var prop in _data) {
                        // Console test
                        // console.log(prop + " = " + _data[prop]);
                        _dataHTML = _dataHTML.split("{{::" + prop + "}}").join(_data[prop]);
                    }
                    // Remove "../"
                    _dataHTML = _dataHTML.split("../").join("");;
                    createFile(_pathProject, _fileNameWE + '.html', _dataHTML);
                }).fail(function (err) {
                    error(err.name);
                });
            }).fail(function (err) {
                error(err.name);
            });
        }
    }

    // Menu
    var Menu = Menus.addMenu('Minimal', 'arturguedes.minimal'),
        cmm_init = "arturguedes.minimalreplace_init",
        cmm_about = "arturguedes.minimalreplace_about";

    CommandManager.register("Setup Minimal Replace structure", cmm_init, init);
    //CommandManager.register("About", i_about, about);

    Menu.addMenuItem(cmm_init, "Alt-Shift-R");
    //Menu.addMenuDivider();
    //Menu.addMenuItem(i_about);

    // Save
    $(DocumentManager).on('documentSaved', function (event, document) {
        replace();
    });

});
