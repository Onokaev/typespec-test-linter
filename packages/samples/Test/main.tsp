import "mylibrary";
using MyLibrary;

namespace microsoft.graph {
    enum someEnum {
        myMember
    }
    
    model Foo {
        something: MyLibrary.Person;
    }
}