//our root app component
import { Component, ViewChild } from '@angular/core';

import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'my-app',
  template: `
    <my-tabs>
      <my-tab [tabTitle]="'People'">
        <h3>List of People</h3>
        <people-list
          [people]="people"
          (addPerson)="onAddPerson()"
          (editPerson)="onEditPerson($event)">
        </people-list>
        <hr />
        <button class="btn btn-default" (click)="onOpenAbout()"><i class="glyphicon glyphicon-question-sign"></i> About this</button>
      </my-tab>
    </my-tabs>

    <ng-template let-person="person" #personEdit>
      <person-edit [person]="person" (savePerson)="onPersonFormSubmit($event)"></person-edit>
    </ng-template>
    <ng-template #about>
      <p>
        Hi, I hope this demo was useful to learn more about dynamic components
        in Angular, in specific about <code>ViewContainerRef</code>,
        <code>ComponentResolverFactory</code> etc.
      </p>
      <p>
        Also check out the <a href="https://juristr.com/blog/2017/07/ng2-dynamic-tab-component/">according blog article</a>. You
        may also want to read the <a href="https://juristr.com/blog/2016/02/learning-ng2-creating-tab-component/">article about
        creating basic tabs with <code>@ContentChildren</code> and <code>@QueryList</code></a>.
      </p>
      <p>
        Visit me on <a href="https://twitter.com/juristr">Twitter</a> or on <a href="https://juristr.com/blog">blog</a>.
      </p>
    </ng-template>
  `
})
export class AppComponent {
  @ViewChild('personEdit') editPersonTemplate;
  @ViewChild('about') aboutTemplate;
  @ViewChild(TabsComponent) tabsComponent;

  people = [
    {
      id: 1,
      name: 'Juri',
      surname: 'Strumpflohner',
      twitter: '@juristr'
    }
  ];

  onEditPerson(person) {
    this.tabsComponent.openTab(
      `Editing ${person.name}`,
      this.editPersonTemplate,
      person,
      true
    );
  }

  onAddPerson() {
    this.tabsComponent.openTab('New Person', this.editPersonTemplate, {}, true);
  }

  onPersonFormSubmit(dataModel) {
    if (dataModel.id > 0) {
      this.people = this.people.map(person => {
        if (person.id === dataModel.id) {
          return dataModel;
        } else {
          return person;
        }
      });
    } else {
      // create a new one
      dataModel.id = Math.round(Math.random() * 100);
      this.people.push(dataModel);
    }

    // close the tab
    this.tabsComponent.closeActiveTab();
  }

  onOpenAbout() {
    this.tabsComponent.openTab('About', this.aboutTemplate, {}, true);
  }
}
