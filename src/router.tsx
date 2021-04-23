import { AuthorEdit } from "./components/author/edit";
import { AuthorList } from "./components/author/list";
import { BookEdit } from "./components/book/edit";
import { BookList } from "./components/book/list";
import { PublisherEdit } from "./components/publisher/edit";
import { PublisherList } from "./components/publisher/list";
import { RouteProps } from "react-router-dom";

interface IRoute extends RouteProps {
  label?: string;
  children?: IRoute[]
  path: string
}

export const routes: IRoute[] = [
  {
    path: '/',
    label: 'Home'
  },
  {
    path: '/authors',
    component: AuthorList,
    label: 'Autorzy'
  },
  {
    path: '/author',
    component: AuthorEdit,
    children: [
      {
        path: "/author/:id",
        component: AuthorEdit,
      },
    ],
  },
  {
    path: '/books',
    component: BookList,
    label: 'Książki'
  },
  {
    path: '/book',
    component: BookEdit,
    children: [
      {
        path: "/book/:id",
        component: BookEdit,
      },
    ],
  },
  {
    path: '/publishers',
    component: PublisherList,
    label: 'Wydawnictwa'
  },
  {
    path: '/publisher',
    component: PublisherEdit,
    children: [
      {
        path: "/publisher/:id",
        component: PublisherEdit,
      },
    ],
  },
];

export const getRoutes = (): IRoute[] => {
  const results: IRoute[] = [];
  routes.forEach(item => {
    // item.path = `/zd2${item.path}`;
    results.push(item);
    (item.children || []).forEach(item => {
      // item.path = `/zd2${item.path}`;
      results.push(item);
    });
  });
  return results;
};

export const getNav = (): IRoute[] => {
  return routes.filter(({ label }) => !!label);
};
