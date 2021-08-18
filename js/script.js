/* eslint-disable no-mixed-spaces-and-tabs */
'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');


  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  console.log(links);
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  console.log('targetArticle');
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log(targetArticle);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';



function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHtml');

    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log('links', links);

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}


function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };

  for (let tag in tags) {

    console.log(tag + ' is used ' + tags[tag] + 'times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}


function calculateTagClass(count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}




function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);
    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + tag + '"> <span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {

        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;

    /*End LOOP for every article*/
  }


  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');//

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /*create variable for all links HTML code*/
  let allTagsHTML = '';

  /*Start LOOP for each tag in allTags*/
  for (let tag in allTags) {

    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"></a> (' + allTags[tag] + ') ' + '</li>';

    /*generate code of a link and add it to allTagsHTML*/
    allTagsHTML += tagLinkHTML;

    /*end LOOP for each tag in allTags: */
  }

  /*add html from allTagsHtml to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTags();




function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {

    /* remove class active */
    tagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLinkHref of tagLinksHref) {

    /* add class active */
    tagLinkHref.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}



function addClickListenersToTags() {

  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();



function calculateAuthorsParams(authors) {
  const params = { max: 0, min: 999999 };

  for (let author in authors) {

    console.log(author + ' is used ' + authors[author] + 'times');
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
  }

  return params;
}


function calculateAuthorsClass(count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}








function generateAuthors() {

  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);

    /* find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-authors attribute */
    const articleAuthors = article.getAttribute('data-author');
    console.log(articleAuthors); //cannot be null//

    /* generate HTML of the link */
    let linkHTML = '<a href="#author-' + articleAuthors + '"> <span>' + articleAuthors + '</span></a>';

    /* add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors.hasOwnProperty(articleAuthors)) {

      /* [NEW] add generated code to allTags array */
      allAuthors[articleAuthors] = 1;
    } else {
      allAuthors[articleAuthors]++;
    }

    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = html;
    console.log(authorsWrapper.innerHTML);
  }
  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector('.authors');

  /* [NEW] add html from allAuthors to authorList */
  // authorsList.innerHTML = allAuthors.join(' ');//

  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorsParams);

  /*create variable for all links HTML code*/
  let allAuthorsHTML = '';

  /*start LOOP for each author in allAuthors*/
  for (let author in allAuthors) {

    const authorLinkHTML = '<li><a class="' + calculateAuthorsClass(allAuthors[author], authorsParams) + '" href="#author-' + author + '"></a>(' + allAuthors[author] + ') ' + '</li>';

    /*generate code of a link and add it to allAuthorsHTML*/
    allAuthorsHTML += authorLinkHTML;

    /*end LOOP for each author in allAuthors: */
  }
  /* add html from allAuthorsHTML to authorList*/
  authorsList.innerHTML = allAuthorsHTML;

}
generateAuthors();




function addClickListenersToAuthors() {

  /* find all authorLinks to tags */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each authorLink */
  for (let authorLink of authorLinks) {

    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();



function authorClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let authorLink of authorLinks) {

    /* remove class active */
    authorLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let authorLinkHref of authorLinksHref) {

    /* add class active */
    authorLinkHref.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  generateTitleLinks('[data-author="' + author + '"]');
}