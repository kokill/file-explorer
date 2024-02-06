import { Tree, FileType } from './types';

export const tree_data: Tree = {
  type: "folder" as FileType,
  name: "parent",
  data: [
    {
      type: "folder" as FileType,
      name: "root",
      data: [
        {
          type: "folder" as FileType,
          name: "src",
          data: [
            {
              type: "file" as FileType,
              meta: 'js',
              name: "index.js"
            }
          ]
        },
        {
          type: "folder" as FileType,
          name: "public",
          data: [
            {
              type: "file" as FileType,
              meta: 'ts',
              name: "index.ts"
            }
          ]
        },
        {
          type: "file" as FileType,
          meta: 'html',
          name: "index.html"
        },
        {
          type: "folder" as FileType,
          name: "data",
          data: [
            {
              type: "folder" as FileType,
              name: "images",
              data: [
                {
                  type: "file" as FileType,
                  meta: 'img',
                  name: "image.png"
                },
                {
                  type: "file" as FileType,
                  meta: 'img',
                  name: "image2.webp"
                }
              ]
            },
            {
              type: "file" as FileType,
              meta: 'svg',
              name: "logo.svg"

            }
          ]
        },
        {
          type: "file" as FileType,
          meta: 'css',
          name: "style.css"
        }
      ]
    }
  ]
};